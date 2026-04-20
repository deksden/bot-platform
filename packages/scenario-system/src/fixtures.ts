export type ScenarioFixtureSeedStrategy =
  | 'seeded_in_scenario'
  | 'requires_hosted_preflight'
  | 'ui_contract_static';

export type ScenarioHostedActorReuse = 'none' | 'persisted_storage_state';
export type ScenarioHostedExecutionPolicy =
  | 'default'
  | 'sequential_shared_actor'
  | 'external_manual';

export interface ScenarioFixtureProfile<FixtureProfileId extends string = string> {
  fixtureProfileId: FixtureProfileId;
  title: string;
  description: string;
  workspaceSlug: string | null;
  seedStrategy: ScenarioFixtureSeedStrategy;
  hostedActorReuse?: ScenarioHostedActorReuse;
  hostedExecutionGroup?: string | null;
  hostedExecutionPolicy?: ScenarioHostedExecutionPolicy;
  notes: readonly string[];
}
