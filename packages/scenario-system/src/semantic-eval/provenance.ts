import { execFileSync } from 'node:child_process';

export interface SemanticJudgeRunProvenance {
  generatedAt: string;
  workspaceRevision: string | null;
  nodeVersion: string;
  platform: string;
  architecture: string;
}

const revisionCache = new Map<string, string | null>();

function resolveWorkspaceRevision(rootDir: string): string | null {
  if (revisionCache.has(rootDir)) {
    return revisionCache.get(rootDir) ?? null;
  }

  try {
    const revision = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    const normalized = revision.length > 0 ? revision : null;
    revisionCache.set(rootDir, normalized);
    return normalized;
  } catch {
    revisionCache.set(rootDir, null);
    return null;
  }
}

export function resolveSemanticJudgeRunProvenance(input: {
  rootDir: string;
  generatedAt: string;
}): SemanticJudgeRunProvenance {
  return {
    generatedAt: input.generatedAt,
    workspaceRevision: resolveWorkspaceRevision(input.rootDir),
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch
  };
}
