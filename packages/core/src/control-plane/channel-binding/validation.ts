import type { ChannelKind, PipelineBindingStatus } from '../models';
import {
  ControlPlaneMutationError,
  createControlPlaneMutationFailure,
  createControlPlaneMutationSuccess,
  createControlPlaneValidationError,
  type ControlPlaneMutationEnvelope,
  type ControlPlaneMutationIssue
} from '../mutation-envelopes';
import type {
  ChannelRef,
  IsoTimestamp,
  PipelineId,
  PipelineBindingRef,
  PolicyAssignmentRef
} from '../refs';
import {
  PipelineRegistryError,
  validatePipelineBinding,
  type PipelineDefinition,
  type ValidatePipelineBindingInput
} from '../../runtime/pipeline-registry';
import { normalizePipelineArgs } from './normalization';

export interface ChannelBindingValidationInput<
  TDefinition extends PipelineDefinition = PipelineDefinition
> {
  definitions: ReadonlyArray<TDefinition>;
  channelRef: ChannelRef;
  pipelineBindingRef?: PipelineBindingRef | null;
  pipelineId: PipelineId;
  channelKind: ChannelKind;
  pipelineArgs?: Record<string, unknown> | null;
  policyAssignmentRef?: PolicyAssignmentRef | null;
  validatedAt?: IsoTimestamp | null;
  isRequiredArgSatisfied?: ValidatePipelineBindingInput<TDefinition>['isRequiredArgSatisfied'];
}

export interface ValidatedChannelBinding<
  TDefinition extends PipelineDefinition = PipelineDefinition
> {
  channelRef: ChannelRef;
  pipelineBindingRef: PipelineBindingRef | null;
  pipelineId: PipelineId;
  channelKind: ChannelKind;
  pipelineArgs: Record<string, unknown>;
  policyAssignmentRef: PolicyAssignmentRef | null;
  validatedAt: IsoTimestamp | null;
  definition: TDefinition;
}

export interface ChannelBindingValidationResult<
  TDefinition extends PipelineDefinition = PipelineDefinition
> {
  status: Extract<PipelineBindingStatus, 'bound' | 'invalid'>;
  envelope: ControlPlaneMutationEnvelope<ValidatedChannelBinding<TDefinition>>;
}

function toRegistryIssue(error: PipelineRegistryError): ControlPlaneMutationIssue {
  const details = error.details;

  if (error.code === 'unknown_pipeline') {
    return {
      path: 'pipelineId',
      code: error.code,
      message: error.message,
      details
    };
  }

  if (error.code === 'unsupported_channel_kind') {
    return {
      path: 'channelKind',
      code: error.code,
      message: error.message,
      details
    };
  }

  if (error.code === 'missing_required_arg') {
    const requiredArgKey = details.requiredArgKey;
    return {
      path:
        typeof requiredArgKey === 'string'
          ? `pipelineArgs.${requiredArgKey}`
          : 'pipelineArgs',
      code: error.code,
      message: error.message,
      details
    };
  }

  const argKey = details.argKey;
  return {
    path: typeof argKey === 'string' ? `pipelineArgs.${argKey}` : 'pipelineArgs',
    code: error.code,
    message: error.message,
    details
  };
}

function mapRegistryErrorToEnvelopeFailure<
  TDefinition extends PipelineDefinition = PipelineDefinition
>(
  input: ChannelBindingValidationInput<TDefinition>,
  error: PipelineRegistryError
): ControlPlaneMutationEnvelope<ValidatedChannelBinding<TDefinition>> {
  const code =
    error.code === 'unknown_pipeline' || error.code === 'unsupported_channel_kind'
      ? 'invalid_relation'
      : 'invalid_input';

  return createControlPlaneMutationFailure(
    createControlPlaneValidationError({
      code,
      message: error.message,
      issues: [toRegistryIssue(error)],
      details: {
        channelRef: input.channelRef,
        pipelineBindingRef: input.pipelineBindingRef ?? null,
        pipelineId: input.pipelineId,
        channelKind: input.channelKind,
        ...error.details
      }
    })
  );
}

export function validateChannelBindingWithRegistry<
  TDefinition extends PipelineDefinition = PipelineDefinition
>(input: ChannelBindingValidationInput<TDefinition>): ChannelBindingValidationResult<TDefinition> {
  const pipelineArgs = normalizePipelineArgs(input.pipelineArgs);
  const registryValidationInput: ValidatePipelineBindingInput<TDefinition> = {
    definitions: input.definitions,
    pipelineId: input.pipelineId,
    channelKind: input.channelKind,
    pipelineArgs
  };

  if (input.isRequiredArgSatisfied) {
    registryValidationInput.isRequiredArgSatisfied = input.isRequiredArgSatisfied;
  }

  try {
    const definition = validatePipelineBinding(registryValidationInput);

    return {
      status: 'bound',
      envelope: createControlPlaneMutationSuccess({
        channelRef: input.channelRef,
        pipelineBindingRef: input.pipelineBindingRef ?? null,
        pipelineId: input.pipelineId,
        channelKind: input.channelKind,
        pipelineArgs,
        policyAssignmentRef: input.policyAssignmentRef ?? null,
        validatedAt: input.validatedAt ?? null,
        definition
      })
    };
  } catch (error) {
    if (error instanceof PipelineRegistryError) {
      return {
        status: 'invalid',
        envelope: mapRegistryErrorToEnvelopeFailure(input, error)
      };
    }

    throw error;
  }
}

export function requireValidatedChannelBinding<
  TDefinition extends PipelineDefinition = PipelineDefinition
>(result: ChannelBindingValidationResult<TDefinition>): ValidatedChannelBinding<TDefinition> {
  if (result.envelope.ok) {
    return result.envelope.value;
  }

  throw new ControlPlaneMutationError(result.envelope.error);
}
