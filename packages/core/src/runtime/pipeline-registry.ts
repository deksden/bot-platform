export interface PipelineDefinition<
  TPipelineId extends string = string,
  TWorkflowFamily extends string = string,
  TChannelKind extends string = string,
  TResultIntentKind extends string = string
> {
  pipelineId: TPipelineId;
  workflowFamily: TWorkflowFamily;
  label: string;
  supportedChannelKinds: TChannelKind[];
  requiredArgKeys: string[];
  optionalArgKeys: string[];
  defaultModelPolicyRef: string | null;
  allowedResultIntents: TResultIntentKind[];
}

export type PipelineRegistryErrorCode =
  | 'unknown_pipeline'
  | 'unsupported_channel_kind'
  | 'missing_required_arg'
  | 'unknown_arg';

export class PipelineRegistryError extends Error {
  readonly code: PipelineRegistryErrorCode;
  readonly details: Record<string, unknown>;

  constructor(input: {
    code: PipelineRegistryErrorCode;
    message: string;
    details?: Record<string, unknown>;
  }) {
    super(input.message);
    this.name = 'PipelineRegistryError';
    this.code = input.code;
    this.details = input.details ?? {};
  }
}

export interface ValidatePipelineBindingInput<
  TDefinition extends PipelineDefinition = PipelineDefinition
> {
  definitions: ReadonlyArray<TDefinition>;
  pipelineId: string;
  channelKind: string;
  pipelineArgs?: Record<string, unknown> | null;
  isRequiredArgSatisfied?: (input: {
    definition: TDefinition;
    requiredArgKey: string;
    pipelineId: string;
    channelKind: string;
    pipelineArgs: Readonly<Record<string, unknown>>;
  }) => boolean;
}

function clonePipelineDefinition<TDefinition extends PipelineDefinition>(
  definition: TDefinition
): TDefinition {
  return {
    ...definition,
    supportedChannelKinds: [...definition.supportedChannelKinds],
    requiredArgKeys: [...definition.requiredArgKeys],
    optionalArgKeys: [...definition.optionalArgKeys],
    allowedResultIntents: [...definition.allowedResultIntents]
  };
}

export function listPipelineDefinitions<TDefinition extends PipelineDefinition>(
  definitions: ReadonlyArray<TDefinition>
): TDefinition[] {
  return definitions.map((definition) => clonePipelineDefinition(definition));
}

export function getPipelineDefinition<TDefinition extends PipelineDefinition>(
  definitions: ReadonlyArray<TDefinition>,
  pipelineId: string
): TDefinition | null {
  const definition = definitions.find((entry) => entry.pipelineId === pipelineId);
  return definition ? clonePipelineDefinition(definition) : null;
}

export function requirePipelineDefinition<TDefinition extends PipelineDefinition>(
  definitions: ReadonlyArray<TDefinition>,
  pipelineId: string
): TDefinition {
  const definition = getPipelineDefinition(definitions, pipelineId);

  if (!definition) {
    throw new PipelineRegistryError({
      code: 'unknown_pipeline',
      message: `Unknown pipelineId: ${pipelineId}`,
      details: { pipelineId }
    });
  }

  return definition;
}

export function validatePipelineBinding<TDefinition extends PipelineDefinition>(
  input: ValidatePipelineBindingInput<TDefinition>
): TDefinition {
  const definition = requirePipelineDefinition(input.definitions, input.pipelineId);
  const pipelineArgs = input.pipelineArgs ?? {};

  if (
    !definition.supportedChannelKinds.some(
      (channelKind) => channelKind === input.channelKind
    )
  ) {
    throw new PipelineRegistryError({
      code: 'unsupported_channel_kind',
      message: `Pipeline ${input.pipelineId} does not support channel kind ${input.channelKind}.`,
      details: {
        pipelineId: input.pipelineId,
        channelKind: input.channelKind,
        supportedChannelKinds: definition.supportedChannelKinds
      }
    });
  }

  const knownKeys = new Set([
    ...definition.requiredArgKeys,
    ...definition.optionalArgKeys
  ]);

  for (const requiredArgKey of definition.requiredArgKeys) {
    if (
      input.isRequiredArgSatisfied?.({
        definition,
        requiredArgKey,
        pipelineId: input.pipelineId,
        channelKind: input.channelKind,
        pipelineArgs
      })
    ) {
      continue;
    }

    const value = pipelineArgs[requiredArgKey];
    if (value === undefined || value === null || value === '') {
      throw new PipelineRegistryError({
        code: 'missing_required_arg',
        message: `Pipeline ${input.pipelineId} requires pipeline arg ${requiredArgKey}.`,
        details: {
          pipelineId: input.pipelineId,
          channelKind: input.channelKind,
          requiredArgKey
        }
      });
    }
  }

  for (const key of Object.keys(pipelineArgs)) {
    if (!knownKeys.has(key)) {
      throw new PipelineRegistryError({
        code: 'unknown_arg',
        message: `Pipeline ${input.pipelineId} does not accept pipeline arg ${key}.`,
        details: {
          pipelineId: input.pipelineId,
          channelKind: input.channelKind,
          argKey: key
        }
      });
    }
  }

  return definition;
}
