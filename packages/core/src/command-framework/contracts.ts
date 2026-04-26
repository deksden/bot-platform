import type { ControlPlaneCapabilityFamily } from '../control-plane/capabilities';
import type { ChannelKind } from '../control-plane/models';
import type {
  ChannelRef,
  ExecutionRunRef,
  IsoTimestamp,
  PrincipalRef,
  ProductInstanceRef,
  TraceArtifactRef,
  WorkspaceRef
} from '../control-plane/refs';

export type KnownCommandActorType =
  | 'system_admin'
  | 'workspace_admin'
  | 'employee'
  | 'known_external'
  | 'unknown_external'
  | 'anonymous';

export type CommandActorType = KnownCommandActorType | (string & {});

export interface CommandActorContext<TMetadata = Record<string, unknown>> {
  actorType: CommandActorType;
  actorRef?: string | null;
  principalRef?: PrincipalRef | null;
  workspaceRef?: WorkspaceRef | null;
  productInstanceRef?: ProductInstanceRef | null;
  capabilityFamilies?: ControlPlaneCapabilityFamily[];
  capabilityTags?: string[];
  metadata?: TMetadata;
}

export interface CommandChannelContext {
  channelKind: ChannelKind;
  channelRef?: ChannelRef | null;
  integrationRef?: string | null;
  threadRef?: string | null;
  transportMessageRef?: string | null;
}

export interface CommandOwnershipContext {
  workspaceRef?: WorkspaceRef | null;
  productInstanceRef?: ProductInstanceRef | null;
  tenantRef?: string | null;
  scopeRef?: string | null;
}

export interface CommandCorrelationContext {
  requestId?: string | null;
  correlationId?: string | null;
  executionRunRef?: ExecutionRunRef | null;
  traceArtifactRef?: TraceArtifactRef | null;
  occurredAt?: IsoTimestamp | null;
  metadata?: Record<string, unknown>;
}

export interface CommandEnvelope<
  TArgs = Record<string, unknown>,
  TRawInput = unknown,
  TActorMetadata = Record<string, unknown>
> {
  commandKey: string;
  rawInput: TRawInput;
  normalizedArgs: TArgs;
  actor: CommandActorContext<TActorMetadata>;
  channel: CommandChannelContext;
  ownership?: CommandOwnershipContext;
  correlation?: CommandCorrelationContext;
}

export interface CommandParseDiagnostic {
  code: string;
  message: string;
  path?: string | null;
  details?: Record<string, unknown>;
}

export interface ParsedCommandResult<
  TArgs = Record<string, unknown>,
  TRawInput = unknown,
  TActorMetadata = Record<string, unknown>
> {
  kind: 'parsed';
  envelope: CommandEnvelope<TArgs, TRawInput, TActorMetadata>;
  diagnostics: CommandParseDiagnostic[];
}

export interface NotACommandParseResult {
  kind: 'not_a_command';
  diagnostics: CommandParseDiagnostic[];
}

export interface FailedCommandParseResult {
  kind: 'failed';
  summary: string;
  diagnostics: CommandParseDiagnostic[];
}

export type CommandParseResult<
  TArgs = Record<string, unknown>,
  TRawInput = unknown,
  TActorMetadata = Record<string, unknown>
> =
  | ParsedCommandResult<TArgs, TRawInput, TActorMetadata>
  | NotACommandParseResult
  | FailedCommandParseResult;

export function createParsedCommandResult<
  TArgs = Record<string, unknown>,
  TRawInput = unknown,
  TActorMetadata = Record<string, unknown>
>(input: {
  envelope: CommandEnvelope<TArgs, TRawInput, TActorMetadata>;
  diagnostics?: CommandParseDiagnostic[];
}): ParsedCommandResult<TArgs, TRawInput, TActorMetadata> {
  return {
    kind: 'parsed',
    envelope: input.envelope,
    diagnostics: input.diagnostics ? [...input.diagnostics] : []
  };
}

export function createNotACommandParseResult(input?: {
  diagnostics?: CommandParseDiagnostic[];
}): NotACommandParseResult {
  return {
    kind: 'not_a_command',
    diagnostics: input?.diagnostics ? [...input.diagnostics] : []
  };
}

export function createFailedCommandParseResult(input: {
  summary: string;
  diagnostics?: CommandParseDiagnostic[];
}): FailedCommandParseResult {
  return {
    kind: 'failed',
    summary: input.summary,
    diagnostics: input.diagnostics ? [...input.diagnostics] : []
  };
}

export interface CommandValidationDiagnostic {
  code: string;
  message: string;
  path?: string | null;
  details?: Record<string, unknown>;
}

export type CommandValidationResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      summary: string;
      diagnostics: CommandValidationDiagnostic[];
    };

export interface CommandPolicyRuleSet<TValue extends string> {
  allow?: readonly TValue[];
  deny?: readonly TValue[];
}

export interface CommandAvailabilityPolicy {
  actorTypes?: CommandPolicyRuleSet<CommandActorType>;
  channelKinds?: CommandPolicyRuleSet<ChannelKind>;
  channelRefs?: CommandPolicyRuleSet<ChannelRef>;
}

export type CommandAvailabilityDenyReasonCode =
  | 'default_deny'
  | 'actor_type_denied'
  | 'actor_type_not_allowed'
  | 'channel_kind_denied'
  | 'channel_kind_not_allowed'
  | 'channel_ref_denied'
  | 'channel_ref_not_allowed';

export type CommandAvailabilityAllowReasonCode = 'policy_allows';

export type CommandAvailabilityReasonCode =
  | CommandAvailabilityDenyReasonCode
  | CommandAvailabilityAllowReasonCode;

export type CommandAvailabilityDecision =
  | {
      allowed: true;
      reasonCode: CommandAvailabilityAllowReasonCode;
    }
  | {
      allowed: false;
      reasonCode: CommandAvailabilityDenyReasonCode;
    };

function includesValue<TValue extends string>(
  values: readonly TValue[] | undefined,
  value: TValue | null
): boolean {
  if (!values || value === null) {
    return false;
  }

  return values.some((entry) => entry === value);
}

export function evaluateCommandAvailability(input: {
  policy?: CommandAvailabilityPolicy | null;
  actorType: CommandActorType;
  channelKind: ChannelKind;
  channelRef?: ChannelRef | null;
}): CommandAvailabilityDecision {
  const policy = input.policy ?? null;

  if (!policy) {
    return {
      allowed: false,
      reasonCode: 'default_deny'
    };
  }

  if (includesValue(policy.actorTypes?.deny, input.actorType)) {
    return { allowed: false, reasonCode: 'actor_type_denied' };
  }

  if (includesValue(policy.channelKinds?.deny, input.channelKind)) {
    return { allowed: false, reasonCode: 'channel_kind_denied' };
  }

  if (includesValue(policy.channelRefs?.deny, input.channelRef ?? null)) {
    return { allowed: false, reasonCode: 'channel_ref_denied' };
  }

  if (policy.actorTypes?.allow && !includesValue(policy.actorTypes.allow, input.actorType)) {
    return { allowed: false, reasonCode: 'actor_type_not_allowed' };
  }

  if (
    policy.channelKinds?.allow &&
    !includesValue(policy.channelKinds.allow, input.channelKind)
  ) {
    return { allowed: false, reasonCode: 'channel_kind_not_allowed' };
  }

  if (policy.channelRefs?.allow) {
    const hasAllowedRef = includesValue(policy.channelRefs.allow, input.channelRef ?? null);
    if (!hasAllowedRef) {
      return { allowed: false, reasonCode: 'channel_ref_not_allowed' };
    }
  }

  return {
    allowed: true,
    reasonCode: 'policy_allows'
  };
}

export interface CommandDefinition<
  TArgs = unknown,
  TResult = unknown,
  TContext = unknown,
  TRawInput = unknown,
  TActorMetadata = Record<string, unknown>
> {
  commandKey: string;
  description?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  availabilityPolicy?: CommandAvailabilityPolicy;
  validateArgs?: (input: {
    args: TArgs;
    envelope: CommandEnvelope<TArgs, TRawInput, TActorMetadata>;
  }) => CommandValidationResult;
  handler: (input: {
    envelope: CommandEnvelope<TArgs, TRawInput, TActorMetadata>;
    context: TContext;
  }) => Promise<TResult> | TResult;
}

export interface CommandRegistry<
  TDefinition extends CommandDefinition<any, any, any, any, any> = CommandDefinition<
    any,
    any,
    any,
    any,
    any
  >
> {
  readonly byCommandKey: ReadonlyMap<string, TDefinition>;
}

export type CommandRegistryErrorCode = 'duplicate_command_key' | 'unknown_command';

export class CommandRegistryError extends Error {
  readonly code: CommandRegistryErrorCode;
  readonly details: Record<string, unknown>;

  constructor(input: {
    code: CommandRegistryErrorCode;
    message: string;
    details?: Record<string, unknown>;
  }) {
    super(input.message);
    this.name = 'CommandRegistryError';
    this.code = input.code;
    this.details = input.details ?? {};
  }
}

function cloneCommandDefinition<TDefinition extends CommandDefinition<any, any, any, any, any>>(
  definition: TDefinition
): TDefinition {
  return {
    ...definition,
    ...(definition.tags ? { tags: [...definition.tags] } : {})
  };
}

export function createCommandRegistry<
  TDefinition extends CommandDefinition<any, any, any, any, any>
>(
  definitions: ReadonlyArray<TDefinition>
): CommandRegistry<TDefinition> {
  const byCommandKey = new Map<string, TDefinition>();

  for (const definition of definitions) {
    if (byCommandKey.has(definition.commandKey)) {
      throw new CommandRegistryError({
        code: 'duplicate_command_key',
        message: `Duplicate command key: ${definition.commandKey}`,
        details: {
          commandKey: definition.commandKey
        }
      });
    }

    byCommandKey.set(definition.commandKey, cloneCommandDefinition(definition));
  }

  return {
    byCommandKey
  };
}

export function listCommandDefinitions<
  TDefinition extends CommandDefinition<any, any, any, any, any>
>(
  registry: CommandRegistry<TDefinition>
): TDefinition[] {
  return [...registry.byCommandKey.values()].map((definition) =>
    cloneCommandDefinition(definition)
  );
}

export function getCommandDefinition<
  TDefinition extends CommandDefinition<any, any, any, any, any>
>(
  registry: CommandRegistry<TDefinition>,
  commandKey: string
): TDefinition | null {
  const definition = registry.byCommandKey.get(commandKey);
  return definition ? cloneCommandDefinition(definition) : null;
}

export function requireCommandDefinition<
  TDefinition extends CommandDefinition<any, any, any, any, any>
>(
  registry: CommandRegistry<TDefinition>,
  commandKey: string
): TDefinition {
  const definition = getCommandDefinition(registry, commandKey);

  if (!definition) {
    throw new CommandRegistryError({
      code: 'unknown_command',
      message: `Unknown command key: ${commandKey}`,
      details: {
        commandKey
      }
    });
  }

  return definition;
}

export type CommandDispatchFailureClass =
  | 'parse_error'
  | 'unknown_command'
  | 'validation_error'
  | 'access_denied'
  | 'dispatch_error';

export interface CommandDispatchDiagnostic {
  code: string;
  message: string;
  path?: string | null;
  details?: Record<string, unknown>;
}

export interface CommandDispatchSuccess<TResult> {
  ok: true;
  commandKey: string;
  payload: TResult;
  correlationId: string | null;
}

export interface CommandDispatchFailure {
  ok: false;
  failureClass: CommandDispatchFailureClass;
  commandKey: string | null;
  publicSummary: string;
  correlationId: string | null;
  diagnostics: CommandDispatchDiagnostic[];
  details: Record<string, unknown>;
}

export interface CommandDispatchSkipped {
  ok: false;
  skipped: true;
  reasonCode: 'not_a_command';
  commandKey: null;
  publicSummary: string;
  correlationId: string | null;
  diagnostics: CommandDispatchDiagnostic[];
}

export type CommandDispatchResult<TResult> =
  | CommandDispatchSuccess<TResult>
  | CommandDispatchFailure
  | CommandDispatchSkipped;

export function dispatchCommand<
  TResult = unknown,
  TContext = unknown,
  TActorMetadata = Record<string, unknown>
>(input: {
  registry: CommandRegistry<
    CommandDefinition<unknown, TResult, TContext, unknown, TActorMetadata>
  >;
  parseResult: CommandParseResult<unknown, unknown, TActorMetadata>;
  context: TContext;
  resolveAvailabilityPolicy?: (input: {
    definition: CommandDefinition<unknown, TResult, TContext, unknown, TActorMetadata>;
    envelope: CommandEnvelope<unknown, unknown, TActorMetadata>;
  }) => CommandAvailabilityPolicy | null | undefined;
}): Promise<CommandDispatchResult<TResult>> {
  const parseResult = input.parseResult;

  if (parseResult.kind === 'not_a_command') {
    return Promise.resolve({
      ok: false,
      skipped: true,
      reasonCode: 'not_a_command',
      commandKey: null,
      publicSummary: 'Input is not a command.',
      correlationId: null,
      diagnostics: parseResult.diagnostics.map((diagnostic) => ({ ...diagnostic }))
    });
  }

  if (parseResult.kind === 'failed') {
    return Promise.resolve({
      ok: false,
      failureClass: 'parse_error',
      commandKey: null,
      publicSummary: parseResult.summary,
      correlationId: null,
      diagnostics: parseResult.diagnostics.map((diagnostic) => ({ ...diagnostic })),
      details: {}
    });
  }

  const envelope = parseResult.envelope;
  const correlationId = envelope.correlation?.correlationId ?? null;
  const definition = getCommandDefinition(input.registry, envelope.commandKey);

  if (!definition) {
    return Promise.resolve({
      ok: false,
      failureClass: 'unknown_command',
      commandKey: envelope.commandKey,
      publicSummary: `Command ${envelope.commandKey} is not registered.`,
      correlationId,
      diagnostics: [],
      details: {}
    });
  }

  const validationResult = definition.validateArgs?.({
    args: envelope.normalizedArgs,
    envelope
  });

  if (validationResult && !validationResult.ok) {
    return Promise.resolve({
      ok: false,
      failureClass: 'validation_error',
      commandKey: envelope.commandKey,
      publicSummary: validationResult.summary,
      correlationId,
      diagnostics: validationResult.diagnostics.map((diagnostic) => ({ ...diagnostic })),
      details: {}
    });
  }

  const internalAvailabilityDecision = evaluateCommandAvailability({
    policy: definition.availabilityPolicy ?? null,
    actorType: envelope.actor.actorType,
    channelKind: envelope.channel.channelKind,
    channelRef: envelope.channel.channelRef ?? null
  });

  if (!internalAvailabilityDecision.allowed) {
    return Promise.resolve({
      ok: false,
      failureClass: 'access_denied',
      commandKey: envelope.commandKey,
      publicSummary: 'Command is not available for this actor or channel.',
      correlationId,
      diagnostics: [],
      details: {
        reasonCode: internalAvailabilityDecision.reasonCode
      }
    });
  }

  const externalPolicy = input.resolveAvailabilityPolicy?.({
    definition,
    envelope
  });

  if (externalPolicy !== undefined && externalPolicy !== null) {
    const externalAvailabilityDecision = evaluateCommandAvailability({
      policy: externalPolicy,
      actorType: envelope.actor.actorType,
      channelKind: envelope.channel.channelKind,
      channelRef: envelope.channel.channelRef ?? null
    });

    if (!externalAvailabilityDecision.allowed) {
      return Promise.resolve({
        ok: false,
        failureClass: 'access_denied',
        commandKey: envelope.commandKey,
        publicSummary: 'Command is not available for this actor or channel.',
        correlationId,
        diagnostics: [],
        details: {
          reasonCode: externalAvailabilityDecision.reasonCode
        }
      });
    }
  }

  return Promise.resolve()
    .then(() =>
      definition.handler({
        envelope,
        context: input.context
      })
    )
    .then((payload) => ({
      ok: true as const,
      commandKey: envelope.commandKey,
      payload,
      correlationId
    }))
    .catch((error: unknown) => {
      const errorName = error instanceof Error ? error.name : 'UnknownError';
      return {
        ok: false,
        failureClass: 'dispatch_error',
        commandKey: envelope.commandKey,
        publicSummary: 'Command handler failed.',
        correlationId,
        diagnostics: [],
        details: {
          errorName
        }
      } satisfies CommandDispatchFailure;
    });
}
