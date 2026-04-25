import type {
  ExecutionRunBindingSnapshot,
  PipelineBinding,
  PipelineBindingStatus
} from '../models';
import type {
  ChannelRef,
  IsoTimestamp,
  PipelineId,
  PipelineBindingRef,
  PolicyAssignmentRef
} from '../refs';
import { normalizePipelineArgs } from './normalization';
import type { ValidatedChannelBinding } from './validation';

export interface AcceptedBindingSnapshotInput {
  channelRef: ChannelRef;
  pipelineBindingRef?: PipelineBindingRef | null;
  pipelineId: PipelineId;
  bindingStatus?: PipelineBindingStatus;
  pipelineArgs?: Record<string, unknown> | null;
  policyAssignmentRef?: PolicyAssignmentRef | null;
  capturedAt: IsoTimestamp;
}

export function createAcceptedBindingSnapshot(
  input: AcceptedBindingSnapshotInput
): ExecutionRunBindingSnapshot {
  return {
    channelRef: input.channelRef,
    pipelineBindingRef: input.pipelineBindingRef ?? null,
    pipelineId: input.pipelineId,
    bindingStatus: input.bindingStatus ?? 'bound',
    pipelineArgs: normalizePipelineArgs(input.pipelineArgs),
    policyAssignmentRef: input.policyAssignmentRef ?? null,
    capturedAt: input.capturedAt
  };
}

export function createAcceptedBindingSnapshotFromPipelineBinding(input: {
  pipelineBinding: PipelineBinding;
  capturedAt: IsoTimestamp;
}): ExecutionRunBindingSnapshot {
  return createAcceptedBindingSnapshot({
    channelRef: input.pipelineBinding.channelRef,
    pipelineBindingRef: input.pipelineBinding.pipelineBindingRef,
    pipelineId: input.pipelineBinding.pipelineId,
    bindingStatus: input.pipelineBinding.bindingStatus,
    pipelineArgs: input.pipelineBinding.pipelineArgs,
    policyAssignmentRef: input.pipelineBinding.policyAssignmentRef ?? null,
    capturedAt: input.capturedAt
  });
}

export function createAcceptedBindingSnapshotFromValidatedBinding(input: {
  validatedBinding: ValidatedChannelBinding;
  capturedAt: IsoTimestamp;
}): ExecutionRunBindingSnapshot {
  return createAcceptedBindingSnapshot({
    channelRef: input.validatedBinding.channelRef,
    pipelineBindingRef: input.validatedBinding.pipelineBindingRef,
    pipelineId: input.validatedBinding.pipelineId,
    bindingStatus: 'bound',
    pipelineArgs: input.validatedBinding.pipelineArgs,
    policyAssignmentRef: input.validatedBinding.policyAssignmentRef,
    capturedAt: input.capturedAt
  });
}
