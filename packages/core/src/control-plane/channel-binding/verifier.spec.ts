import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { PipelineDefinition } from '../../runtime/pipeline-registry';
import type { ChannelCapabilityMatrix, PipelineBinding } from '../models';
import {
  createAcceptedBindingSnapshot,
  createAcceptedBindingSnapshotFromPipelineBinding,
  createAcceptedBindingSnapshotFromValidatedBinding
} from './snapshots';
import {
  assessChannelBindingCapabilities,
  derivePipelineBindingStatus,
  isOperationalPipelineBindingStatus
} from './status';
import { validateChannelBindingWithRegistry } from './validation';

const PIPELINE_DEFINITIONS: ReadonlyArray<PipelineDefinition> = [
  {
    pipelineId: 'seller_conversation',
    workflowFamily: 'seller_conversation',
    label: 'Seller Conversation',
    supportedChannelKinds: ['telegram', 'email'],
    requiredArgKeys: ['releaseRef'],
    optionalArgKeys: ['answerMode', 'presentationMode'],
    defaultModelPolicyRef: 'policy.default',
    allowedResultIntents: ['send_message', 'handoff_request']
  }
];

test('registry-backed binding validation returns bound envelope for valid payload', () => {
  const result = validateChannelBindingWithRegistry({
    definitions: PIPELINE_DEFINITIONS,
    channelRef: 'ch_01',
    pipelineBindingRef: 'pb_01',
    pipelineId: 'seller_conversation',
    channelKind: 'telegram',
    pipelineArgs: {
      releaseRef: 'release-001',
      answerMode: 'direct',
      presentationMode: {
        layout: 'compact',
        priority: { zeta: 2, alpha: 1 }
      }
    },
    policyAssignmentRef: 'pol_01',
    validatedAt: '2026-04-23T12:00:00.000Z'
  });

  assert.equal(result.status, 'bound');
  assert.equal(result.envelope.ok, true);
  if (!result.envelope.ok) {
    assert.fail('Expected successful validation envelope.');
  }

  assert.deepEqual(Object.keys(result.envelope.value.pipelineArgs), [
    'answerMode',
    'presentationMode',
    'releaseRef'
  ]);
  assert.equal(result.envelope.value.definition.pipelineId, 'seller_conversation');
  assert.equal(result.envelope.value.policyAssignmentRef, 'pol_01');
});

test('registry-backed binding validation maps missing required arg into invalid_input envelope', () => {
  const result = validateChannelBindingWithRegistry({
    definitions: PIPELINE_DEFINITIONS,
    channelRef: 'ch_02',
    pipelineId: 'seller_conversation',
    channelKind: 'telegram',
    pipelineArgs: {
      answerMode: 'direct'
    }
  });

  assert.equal(result.status, 'invalid');
  assert.equal(result.envelope.ok, false);
  if (result.envelope.ok) {
    assert.fail('Expected validation failure envelope.');
  }

  assert.equal(result.envelope.error.kind, 'validation');
  assert.equal(result.envelope.error.code, 'invalid_input');
  assert.equal(result.envelope.error.issues[0]?.path, 'pipelineArgs.releaseRef');
  assert.equal(result.envelope.error.issues[0]?.code, 'missing_required_arg');
});

test('registry-backed binding validation maps unsupported channel kind into invalid_relation envelope', () => {
  const result = validateChannelBindingWithRegistry({
    definitions: PIPELINE_DEFINITIONS,
    channelRef: 'ch_03',
    pipelineId: 'seller_conversation',
    channelKind: 'bitrix24_bot',
    pipelineArgs: {
      releaseRef: 'release-001'
    }
  });

  assert.equal(result.status, 'invalid');
  assert.equal(result.envelope.ok, false);
  if (result.envelope.ok) {
    assert.fail('Expected validation failure envelope.');
  }

  assert.equal(result.envelope.error.kind, 'validation');
  assert.equal(result.envelope.error.code, 'invalid_relation');
  assert.equal(result.envelope.error.issues[0]?.path, 'channelKind');
  assert.equal(result.envelope.error.issues[0]?.code, 'unsupported_channel_kind');
});

test('capability assessment and status derivation produce expected shared states', () => {
  const capabilityMatrix: ChannelCapabilityMatrix = {
    supportsSynchronousDelivery: true,
    supportsAsynchronousDelivery: false,
    supportsInbound: true,
    supportsOutbound: false,
    replyThreadLinkingFidelity: 'basic',
    supportsAttachments: false,
    supportsOperatorCommands: true,
    supportsTransportDiagnostics: false
  };

  const degradedAssessment = assessChannelBindingCapabilities({
    capabilityMatrix,
    requirements: {
      requiresOutbound: true,
      requiresAttachments: true,
      minimumReplyThreadLinkingFidelity: 'full'
    }
  });

  assert.deepEqual(degradedAssessment, {
    isDegraded: true,
    missingCapabilities: [
      'outbound',
      'attachments',
      'reply_thread_linking_fidelity'
    ]
  });

  assert.equal(
    derivePipelineBindingStatus({
      isBindingConfigured: true,
      validationStatus: 'valid',
      capabilityAssessment: degradedAssessment
    }),
    'degraded'
  );
  assert.equal(
    derivePipelineBindingStatus({
      isBindingConfigured: true,
      validationStatus: 'invalid'
    }),
    'invalid'
  );
  assert.equal(
    derivePipelineBindingStatus({
      isBindingConfigured: false
    }),
    'unbound'
  );
  assert.equal(
    derivePipelineBindingStatus({
      isBindingConfigured: true,
      isDisabled: true
    }),
    'disabled'
  );
  assert.equal(
    derivePipelineBindingStatus({
      isBindingConfigured: true,
      validationStatus: 'valid'
    }),
    'bound'
  );

  assert.equal(isOperationalPipelineBindingStatus('bound'), true);
  assert.equal(isOperationalPipelineBindingStatus('degraded'), true);
  assert.equal(isOperationalPipelineBindingStatus('invalid'), false);
});

test('accepted snapshot helpers normalize stable runtime input', () => {
  const snapshot = createAcceptedBindingSnapshot({
    channelRef: 'ch_04',
    pipelineId: 'seller_conversation',
    pipelineArgs: {
      zeta: 2,
      alpha: 1,
      nested: {
        b: 2,
        a: 1
      }
    },
    capturedAt: '2026-04-23T12:10:00.000Z'
  });

  assert.deepEqual(Object.keys(snapshot.pipelineArgs), ['alpha', 'nested', 'zeta']);
  const nestedArgs = snapshot.pipelineArgs.nested as Record<string, unknown>;
  assert.deepEqual(Object.keys(nestedArgs), ['a', 'b']);
  assert.equal(snapshot.bindingStatus, 'bound');
  assert.equal(snapshot.policyAssignmentRef, null);

  const pipelineBinding: PipelineBinding = {
    pipelineBindingRef: 'pb_02',
    channelRef: 'ch_04',
    channelKind: 'telegram',
    pipelineId: 'seller_conversation',
    bindingStatus: 'degraded',
    pipelineArgs: {
      releaseRef: 'release-001',
      zeta: 2,
      alpha: 1
    },
    updatedAt: '2026-04-23T12:11:00.000Z'
  };

  const fromBinding = createAcceptedBindingSnapshotFromPipelineBinding({
    pipelineBinding,
    capturedAt: '2026-04-23T12:12:00.000Z'
  });
  assert.deepEqual(Object.keys(fromBinding.pipelineArgs), [
    'alpha',
    'releaseRef',
    'zeta'
  ]);
  assert.equal(fromBinding.bindingStatus, 'degraded');

  const validationResult = validateChannelBindingWithRegistry({
    definitions: PIPELINE_DEFINITIONS,
    channelRef: 'ch_04',
    pipelineBindingRef: 'pb_03',
    pipelineId: 'seller_conversation',
    channelKind: 'telegram',
    pipelineArgs: {
      releaseRef: 'release-001'
    }
  });

  assert.equal(validationResult.envelope.ok, true);
  if (!validationResult.envelope.ok) {
    assert.fail('Expected successful validation envelope.');
  }

  const fromValidated = createAcceptedBindingSnapshotFromValidatedBinding({
    validatedBinding: validationResult.envelope.value,
    capturedAt: '2026-04-23T12:13:00.000Z'
  });
  assert.equal(fromValidated.bindingStatus, 'bound');
  assert.equal(fromValidated.pipelineBindingRef, 'pb_03');
  assert.deepEqual(Object.keys(fromValidated.pipelineArgs), ['releaseRef']);
});
