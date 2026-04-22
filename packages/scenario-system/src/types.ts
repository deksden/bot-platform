export type ScenarioFamily = 'SCN' | 'XE';
export type ScenarioKind = 'capability' | 'golden';
export type ScenarioExecutionStatus =
  | 'runnable_local'
  | 'beta_api'
  | 'beta_ui'
  | 'beta_external_manual'
  | 'mixed'
  | 'planned';
export type ScenarioLocalRuntimePolicy = 'requires_server' | 'self_contained';
export type ScenarioAcceptanceLevel = 'dev' | 'beta';
export type ScenarioVerificationTier = 'dev_smoke' | 'pre_merge' | 'nightly' | 'beta_on_demand';

export interface ScenarioCatalogSnapshot<FixtureProfileId extends string = string> {
  title: string;
  family: ScenarioFamily;
  kind: ScenarioKind;
  executionStatus: ScenarioExecutionStatus;
  localRuntimePolicy: ScenarioLocalRuntimePolicy;
  supportedEnvironments: readonly ('local' | 'beta')[];
  acceptanceLevel: ScenarioAcceptanceLevel;
  verificationTiers: readonly ScenarioVerificationTier[];
  fixtureProfileId: FixtureProfileId;
  primaryFeatures: readonly string[];
  secondaryFeatures: readonly string[];
  docPath: string;
}

export interface ScenarioDefinition<
  FixtureProfileId extends string = string,
  RunOptions = unknown,
  RunResult = ScenarioRunResult
> extends ScenarioCatalogSnapshot<FixtureProfileId> {
  scenarioId: string;
  run: ((options: RunOptions) => Promise<RunResult>) | null;
}

export interface ScenarioRunOptions {
  baseUrl?: string;
  baseUrlExplicit?: boolean;
  webBaseUrl?: string;
  rootDir?: string;
  artifactsDir?: string;
  headed?: boolean;
}

export interface ScenarioRunResult {
  scenarioId: string;
  runId: string;
  passed: boolean;
  artifactPath: string;
}

export interface ScenarioTierRunResult {
  tier: ScenarioVerificationTier;
  runId: string;
  passed: boolean;
  artifactPath: string;
  results: ScenarioRunResult[];
}
