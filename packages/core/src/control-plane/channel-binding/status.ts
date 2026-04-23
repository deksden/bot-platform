import type {
  ChannelCapabilityMatrix,
  PipelineBindingStatus,
  ReplyThreadLinkingFidelity
} from '../models';

const REPLY_THREAD_LINKING_FIDELITY_ORDER: ReplyThreadLinkingFidelity[] = [
  'none',
  'basic',
  'full'
];

export type ChannelBindingCapabilityConstraint =
  | 'synchronous_delivery'
  | 'asynchronous_delivery'
  | 'inbound'
  | 'outbound'
  | 'attachments'
  | 'operator_commands'
  | 'transport_diagnostics'
  | 'reply_thread_linking_fidelity';

export interface ChannelBindingCapabilityRequirements {
  requiresSynchronousDelivery?: boolean;
  requiresAsynchronousDelivery?: boolean;
  requiresInbound?: boolean;
  requiresOutbound?: boolean;
  requiresAttachments?: boolean;
  requiresOperatorCommands?: boolean;
  requiresTransportDiagnostics?: boolean;
  minimumReplyThreadLinkingFidelity?: ReplyThreadLinkingFidelity;
}

export interface ChannelBindingCapabilityAssessment {
  isDegraded: boolean;
  missingCapabilities: ChannelBindingCapabilityConstraint[];
}

export interface DerivePipelineBindingStatusInput {
  isBindingConfigured: boolean;
  isDisabled?: boolean;
  validationStatus?: 'valid' | 'invalid';
  capabilityAssessment?: ChannelBindingCapabilityAssessment | null;
}

function compareReplyThreadLinkingFidelity(
  actualFidelity: ReplyThreadLinkingFidelity,
  minimumFidelity: ReplyThreadLinkingFidelity
): number {
  const actualIndex = REPLY_THREAD_LINKING_FIDELITY_ORDER.indexOf(actualFidelity);
  const minimumIndex =
    REPLY_THREAD_LINKING_FIDELITY_ORDER.indexOf(minimumFidelity);

  return actualIndex - minimumIndex;
}

export function assessChannelBindingCapabilities(input: {
  capabilityMatrix: ChannelCapabilityMatrix;
  requirements?: ChannelBindingCapabilityRequirements;
}): ChannelBindingCapabilityAssessment {
  const requirements = input.requirements ?? {};
  const matrix = input.capabilityMatrix;
  const missingCapabilities: ChannelBindingCapabilityConstraint[] = [];

  if (requirements.requiresSynchronousDelivery && !matrix.supportsSynchronousDelivery) {
    missingCapabilities.push('synchronous_delivery');
  }

  if (
    requirements.requiresAsynchronousDelivery &&
    !matrix.supportsAsynchronousDelivery
  ) {
    missingCapabilities.push('asynchronous_delivery');
  }

  if (requirements.requiresInbound && !matrix.supportsInbound) {
    missingCapabilities.push('inbound');
  }

  if (requirements.requiresOutbound && !matrix.supportsOutbound) {
    missingCapabilities.push('outbound');
  }

  if (requirements.requiresAttachments && !matrix.supportsAttachments) {
    missingCapabilities.push('attachments');
  }

  if (requirements.requiresOperatorCommands && !matrix.supportsOperatorCommands) {
    missingCapabilities.push('operator_commands');
  }

  if (
    requirements.requiresTransportDiagnostics &&
    !matrix.supportsTransportDiagnostics
  ) {
    missingCapabilities.push('transport_diagnostics');
  }

  if (
    requirements.minimumReplyThreadLinkingFidelity &&
    compareReplyThreadLinkingFidelity(
      matrix.replyThreadLinkingFidelity,
      requirements.minimumReplyThreadLinkingFidelity
    ) < 0
  ) {
    missingCapabilities.push('reply_thread_linking_fidelity');
  }

  return {
    isDegraded: missingCapabilities.length > 0,
    missingCapabilities
  };
}

export function derivePipelineBindingStatus(
  input: DerivePipelineBindingStatusInput
): PipelineBindingStatus {
  if (input.isDisabled) {
    return 'disabled';
  }

  if (!input.isBindingConfigured) {
    return 'unbound';
  }

  if (input.validationStatus === 'invalid') {
    return 'invalid';
  }

  if (input.capabilityAssessment?.isDegraded) {
    return 'degraded';
  }

  return 'bound';
}

export function isOperationalPipelineBindingStatus(
  status: PipelineBindingStatus
): boolean {
  return status === 'bound' || status === 'degraded';
}
