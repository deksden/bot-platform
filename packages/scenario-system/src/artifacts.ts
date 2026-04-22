import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import type { ScenarioFixtureProfile } from './fixtures';
import type { ScenarioCatalogSnapshot, ScenarioVerificationTier } from './types';

interface ScenarioManifestEntry<FixtureProfileId extends string = string> {
  scenarioId: string;
  title: string;
  family: 'SCN' | 'XE';
  runId: string;
  passed: boolean | null;
  executionStatus: string;
  acceptanceLevel: string;
  verificationTiers: string[];
  fixtureProfileId: FixtureProfileId | null;
  artifactPath: string;
  recordedAt: string;
}

export interface ScenarioArtifactWriteOptions<FixtureProfileId extends string = string> {
  artifactsDir?: string;
  catalog?: ScenarioCatalogSnapshot<FixtureProfileId> | null;
  fixtureProfile?: ScenarioFixtureProfile<FixtureProfileId> | null;
}

function createRunId(prefix: string): string {
  return `${prefix}-${randomUUID()}`;
}

function timestamp(): string {
  return new Date().toISOString();
}

function scenarioArtifactsRoot(rootDir: string, scenarioId: string, artifactsDir?: string): string {
  return artifactsDir ?? join(rootDir, 'artifacts', 'scenarios', scenarioId);
}

async function readJsonFile<T>(path: string): Promise<T | null> {
  try {
    const content = await readFile(path, 'utf8');
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

export async function prepareScenarioEvidencePath(
  rootDir: string,
  scenarioId: string,
  fileName: string,
  artifactsDir?: string
): Promise<string> {
  const artifactsRoot = scenarioArtifactsRoot(rootDir, scenarioId, artifactsDir);
  const filePath = join(artifactsRoot, fileName);

  await mkdir(dirname(filePath), { recursive: true });

  return filePath;
}

export async function writeScenarioEvidenceFile(
  rootDir: string,
  scenarioId: string,
  fileName: string,
  content: string | Uint8Array,
  artifactsDir?: string
): Promise<string> {
  const filePath = await prepareScenarioEvidencePath(rootDir, scenarioId, fileName, artifactsDir);
  await writeFile(filePath, content);

  return filePath;
}

export async function writeScenarioArtifact<FixtureProfileId extends string = string>(
  rootDir: string,
  scenarioId: string,
  artifactPayload: Record<string, unknown>,
  options: ScenarioArtifactWriteOptions<FixtureProfileId> = {}
): Promise<{ artifactPath: string; runId: string }> {
  const runId = createRunId(scenarioId);
  const artifactsRoot = scenarioArtifactsRoot(rootDir, scenarioId, options.artifactsDir);
  const artifactPath = join(artifactsRoot, `${runId}.json`);
  const latestPath = join(artifactsRoot, 'latest.json');
  const manifestPath = join(rootDir, 'artifacts', 'scenarios', 'manifest.json');
  const recordedAt = timestamp();
  const passed = typeof artifactPayload.passed === 'boolean' ? artifactPayload.passed : null;
  const relativeArtifactPath = relative(rootDir, artifactPath);

  await mkdir(artifactsRoot, { recursive: true });
  await mkdir(join(rootDir, 'artifacts', 'scenarios'), { recursive: true });

  const fullArtifactPayload = {
    ...artifactPayload,
    scenarioId,
    runId,
    recordedAt,
    catalog: options.catalog ?? null,
    fixtureProfile: options.fixtureProfile ?? null
  };

  await writeFile(artifactPath, `${JSON.stringify(fullArtifactPayload, null, 2)}\n`, 'utf8');
  await writeFile(latestPath, `${JSON.stringify(fullArtifactPayload, null, 2)}\n`, 'utf8');

  const existingManifest =
    (await readJsonFile<{ entries: ScenarioManifestEntry<FixtureProfileId>[] }>(manifestPath)) ?? {
      entries: []
    };

  const nextEntry: ScenarioManifestEntry<FixtureProfileId> = {
    scenarioId,
    title: options.catalog?.title ?? scenarioId,
    family: options.catalog?.family ?? (scenarioId.startsWith('XE-') ? 'XE' : 'SCN'),
    runId,
    passed,
    executionStatus: options.catalog?.executionStatus ?? 'planned',
    acceptanceLevel: options.catalog?.acceptanceLevel ?? 'dev',
    verificationTiers: options.catalog?.verificationTiers
      ? [...options.catalog.verificationTiers]
      : [],
    fixtureProfileId: options.catalog?.fixtureProfileId ?? options.fixtureProfile?.fixtureProfileId ?? null,
    artifactPath: relativeArtifactPath,
    recordedAt
  };

  const nextManifest = {
    generatedAt: recordedAt,
    entries: [nextEntry, ...existingManifest.entries].slice(0, 250)
  };

  await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`, 'utf8');

  return { artifactPath, runId };
}

export async function writeScenarioTierArtifact(
  rootDir: string,
  tier: ScenarioVerificationTier,
  artifactPayload: Record<string, unknown>,
  artifactsDir?: string
): Promise<{ artifactPath: string; runId: string }> {
  const runId = createRunId(`TIER-${tier}`);
  const artifactsRoot = artifactsDir ?? join(rootDir, 'artifacts', 'scenarios', 'tiers', tier);
  const artifactPath = join(artifactsRoot, `${runId}.json`);
  const latestPath = join(artifactsRoot, 'latest.json');
  const recordedAt = timestamp();

  await mkdir(artifactsRoot, { recursive: true });

  const fullArtifactPayload = {
    ...artifactPayload,
    tier,
    runId,
    recordedAt
  };

  await writeFile(artifactPath, `${JSON.stringify(fullArtifactPayload, null, 2)}\n`, 'utf8');
  await writeFile(latestPath, `${JSON.stringify(fullArtifactPayload, null, 2)}\n`, 'utf8');

  return { artifactPath, runId };
}
