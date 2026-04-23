import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  controlPlaneChannelReadModelSchema,
  controlPlaneSurfaceListReadbackSchema
} from './read-models';

function createRepresentativeChannelReadModelPayload() {
  return {
    channel: {
      channelRef: 'ch_01',
      workspaceRef: 'ws_01',
      productInstanceRef: 'pi_01',
      channelKind: 'telegram',
      entryPipelineId: 'seller_conversation',
      bindingStatus: 'bound',
      transportConfigSummary: {
        transportKind: 'telegram',
        summary: {
          webhookConfigured: true
        }
      },
      capabilityMatrix: {
        supportsSynchronousDelivery: true,
        supportsAsynchronousDelivery: false,
        supportsInbound: true,
        supportsOutbound: true,
        replyThreadLinkingFidelity: 'full',
        supportsAttachments: true,
        supportsOperatorCommands: true,
        supportsTransportDiagnostics: true
      },
      policyAssignmentRef: 'pol_01',
      overlayRefs: {
        knowledge_source_ref: 'ks_01'
      },
      pipelineBinding: {
        pipelineBindingRef: 'pb_01',
        channelRef: 'ch_01',
        channelKind: 'telegram',
        pipelineId: 'seller_conversation',
        bindingStatus: 'bound',
        pipelineArgs: {
          releaseRef: 'release-001'
        },
        policyAssignmentRef: 'pol_01',
        effectiveArgSchemaRef: 'schema_01',
        versionToken: 'v1',
        validatedAt: '2026-04-23T12:00:00.000Z',
        updatedAt: '2026-04-23T12:01:00.000Z'
      },
      createdAt: '2026-04-23T11:58:00.000Z',
      updatedAt: '2026-04-23T12:01:00.000Z'
    },
    pipelineBinding: {
      pipelineBindingRef: 'pb_01',
      channelRef: 'ch_01',
      channelKind: 'telegram',
      pipelineId: 'seller_conversation',
      bindingStatus: 'bound',
      pipelineArgs: {
        releaseRef: 'release-001'
      },
      policyAssignmentRef: 'pol_01',
      effectiveArgSchemaRef: 'schema_01',
      versionToken: 'v1',
      validatedAt: '2026-04-23T12:00:00.000Z',
      updatedAt: '2026-04-23T12:01:00.000Z'
    },
    pipelineDefinition: {
      pipelineId: 'seller_conversation',
      workflowFamily: 'seller_conversation',
      label: 'Seller Conversation',
      supportedChannelKinds: ['telegram', 'email'],
      requiredArgKeys: ['releaseRef'],
      optionalArgKeys: ['answerMode'],
      defaultModelPolicyRef: 'policy.default',
      allowedResultIntents: ['send_message', 'handoff_request']
    },
    validationIssues: [],
    diagnosticsSummary: {
      lastValidationEvent: 'channel_binding_validated'
    }
  };
}

test('control-plane channel read model parses representative shared payload', () => {
  const parsed = controlPlaneChannelReadModelSchema.parse(
    createRepresentativeChannelReadModelPayload()
  );

  assert.equal(parsed.channel.channelRef, 'ch_01');
  assert.equal(parsed.channel.bindingStatus, 'bound');
  assert.equal(parsed.pipelineBinding?.pipelineBindingRef, 'pb_01');
  assert.equal(parsed.pipelineDefinition?.pipelineId, 'seller_conversation');
});

test('control-plane surface list readback parses representative cp-channels payload', () => {
  const parsed = controlPlaneSurfaceListReadbackSchema.parse({
    surfaceId: 'cp-channels',
    payload: {
      items: [createRepresentativeChannelReadModelPayload()],
      page: {
        limit: 25
      },
      meta: {
        generatedAt: '2026-04-23T12:02:00.000Z'
      }
    }
  });

  assert.equal(parsed.surfaceId, 'cp-channels');
  if (parsed.surfaceId !== 'cp-channels') {
    assert.fail('Expected cp-channels surface payload.');
  }

  assert.equal(parsed.payload.items.length, 1);
  assert.equal(parsed.payload.items[0]?.channel.channelRef, 'ch_01');
});

test('control-plane channel read model rejects bounded invalid shape', () => {
  const validPayload = createRepresentativeChannelReadModelPayload();
  const invalidPayload = {
    ...validPayload,
    channel: {
      ...validPayload.channel,
      bindingStatus: 'broken'
    }
  };

  assert.throws(() => controlPlaneChannelReadModelSchema.parse(invalidPayload));
});
