#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const rootDir = resolve(new URL('..', import.meta.url).pathname);
const packagesDir = resolve(rootDir, 'packages');
const dryRun = process.argv.includes('--dry-run');
const allowedPackages = new Set([
  '@dd-bot-platform/api-contract',
  '@dd-bot-platform/core',
  '@dd-bot-platform/scenario-system'
]);

function readJson(filePath) {
  return readFile(filePath, 'utf8').then((source) => JSON.parse(source));
}

function run(command, args, options = {}) {
  const result = execFileSync(command, args, {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
    env: options.env ?? process.env
  });

  return typeof result === 'string' ? result.trim() : '';
}

function tryRun(command, args, options = {}) {
  try {
    return {
      ok: true,
      stdout: run(command, args, options)
    };
  } catch (error) {
    return {
      ok: false,
      error
    };
  }
}

async function loadPublishablePackages() {
  const packageDirs = (await readdir(packagesDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => resolve(packagesDir, entry.name));

  const packages = [];
  for (const packageDir of packageDirs) {
    const packageJsonPath = resolve(packageDir, 'package.json');
    const packageJson = await readJson(packageJsonPath);
    if (packageJson.private === true) {
      continue;
    }
    if (!allowedPackages.has(packageJson.name)) {
      continue;
    }
    if (packageJson.publishConfig?.access !== 'public') {
      throw new Error(
        `Allowed package ${packageJson.name} must declare publishConfig.access="public".`
      );
    }
    packages.push({
      dir: packageDir,
      packageJson
    });
  }

  const names = new Set(packages.map((entry) => entry.packageJson.name));
  const incoming = new Map();
  const outgoing = new Map();

  for (const entry of packages) {
    incoming.set(entry.packageJson.name, 0);
    outgoing.set(entry.packageJson.name, new Set());
  }

  for (const entry of packages) {
    const dependencyNames = Object.keys(entry.packageJson.dependencies ?? {}).filter((name) =>
      names.has(name)
    );
    for (const dependencyName of dependencyNames) {
      outgoing.get(dependencyName).add(entry.packageJson.name);
      incoming.set(entry.packageJson.name, (incoming.get(entry.packageJson.name) ?? 0) + 1);
    }
  }

  const ready = packages
    .map((entry) => entry.packageJson.name)
    .filter((name) => (incoming.get(name) ?? 0) === 0)
    .sort();
  const ordered = [];

  while (ready.length > 0) {
    const name = ready.shift();
    ordered.push(name);
    for (const dependentName of outgoing.get(name) ?? []) {
      const nextIncoming = (incoming.get(dependentName) ?? 0) - 1;
      incoming.set(dependentName, nextIncoming);
      if (nextIncoming === 0) {
        ready.push(dependentName);
        ready.sort();
      }
    }
  }

  if (ordered.length !== packages.length) {
    throw new Error('Could not resolve publish order for allowed private packages.');
  }

  return ordered.map((name) => packages.find((entry) => entry.packageJson.name === name));
}

async function packPackage(packageName) {
  const tempDir = await mkdtemp(join(tmpdir(), 'dd-bot-platform-publish-'));
  try {
    run('pnpm', ['--filter', packageName, 'pack', '--pack-destination', tempDir], {
      stdio: ['ignore', 'inherit', 'inherit']
    });
    const entries = await readdir(tempDir);
    const tarballs = entries.filter((entry) => entry.endsWith('.tgz')).sort();
    if (tarballs.length !== 1) {
      throw new Error(
        `Expected exactly one tarball for ${packageName}, but found ${tarballs.length} in ${tempDir}.`
      );
    }
    return {
      tarballPath: resolve(tempDir, tarballs[0]),
      cleanup: async () => rm(tempDir, { recursive: true, force: true })
    };
  } catch (error) {
    await rm(tempDir, { recursive: true, force: true });
    throw error;
  }
}

async function main() {
  const packages = await loadPublishablePackages();
  const published = [];
  const skipped = [];

  for (const entry of packages) {
    const { name, version } = entry.packageJson;
    const current = tryRun('npm', ['view', `${name}@${version}`, 'version']);
    if (current.ok && current.stdout === version) {
      skipped.push(`${name}@${version}`);
      process.stdout.write(`Skipping ${name}@${version}; already published.\n`);
      continue;
    }

    const packed = await packPackage(name);
    try {
      if (dryRun) {
        process.stdout.write(`Dry run: would publish ${name}@${version} from ${packed.tarballPath}\n`);
      } else {
        process.stdout.write(`Publishing ${name}@${version}...\n`);
        run('npm', ['publish', packed.tarballPath, '--access', 'public'], {
          stdio: ['ignore', 'inherit', 'inherit']
        });
        published.push(`${name}@${version}`);
      }
    } finally {
      await packed.cleanup();
    }
  }

  process.stdout.write(
    `${dryRun ? 'Dry run complete' : 'Publish complete'}.\nPublished: ${published.length}\nSkipped: ${skipped.length}\n`
  );
}

await main();
