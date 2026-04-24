import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  controlPlaneChannelReadModelSchema,
  controlPlaneExecutionRunReadModelSchema,
  controlPlaneSurfaceListReadbackSchema,
  controlPlaneTraceArtifactReadModelSchema
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

function createRepresentativeExecutionUsageSummary() {
  return {
    inputTokens: 128,
    outputTokens: 64,
    cacheReadTokens: 16,
    cacheWriteTokens: 0,
    totalTokens: 208
  };
}

function createRepresentativeExecutionRunReadModelPayload() {
  const usageSummary = createRepresentativeExecutionUsageSummary();

  return {
    run: {
      executionRunRef: 'run_01',
      workspaceRef: 'ws_01',
      productInstanceRef: 'pi_01',
      channelRef: 'ch_01',
      pipelineId: 'seller_conversation',
      workflowFamily: 'seller_conversation',
      status: 'completed',
      acceptedBindingSnapshot: {
        channelRef: 'ch_01',
        pipelineBindingRef: 'pb_01',
        pipelineId: 'seller_conversation',
        bindingStatus: 'bound',
        pipelineArgs: {
          releaseRef: 'release-001',
          answerMode: 'assisted'
        },
        policyAssignmentRef: 'pol_01',
        capturedAt: '2026-04-24T09:02:00.000Z'
      },
      attemptCount: 1,
      retryCount: 0,
      failoverCount: 0,
      usageSummary,
      traceArtifactRefs: ['ta_01', 'ta_02'],
      startedAt: '2026-04-24T09:02:00.000Z',
      completedAt: '2026-04-24T09:03:15.000Z'
    },
    steps: [
      {
        stepRef: 'run_01_step_accept',
        stepKind: 'accept_binding',
        status: 'completed',
        attemptCount: 1,
        retryCount: 0,
        failoverCount: 0,
        startedAt: '2026-04-24T09:02:00.000Z',
        completedAt: '2026-04-24T09:02:05.000Z',
        errorCode: null,
        errorMessage: null,
        metadata: {
          source: 'control-plane'
        }
      },
      {
        stepRef: 'run_01_step_reply',
        stepKind: 'deliver_reply',
        status: 'completed',
        attemptCount: 1,
        retryCount: 0,
        failoverCount: 0,
        startedAt: '2026-04-24T09:02:06.000Z',
        completedAt: '2026-04-24T09:03:15.000Z',
        errorCode: null,
        errorMessage: null,
        metadata: {
          transportKind: 'telegram'
        }
      }
    ],
    usageSummary,
    linkedArtifacts: [
      {
        traceArtifactRef: 'ta_01',
        artifactKind: 'rendered_prompt',
        redactionState: 'partial',
        createdAt: '2026-04-24T09:02:10.000Z'
      },
      {
        traceArtifactRef: 'ta_02',
        artifactKind: 'backend_response',
        redactionState: 'none',
        createdAt: '2026-04-24T09:03:12.000Z'
      }
    ]
  };
}

function createRepresentativeTraceArtifactReadModelPayload() {
  const executionRunReadModel = createRepresentativeExecutionRunReadModelPayload();

  return {
    artifact: {
      traceArtifactRef: 'ta_02',
      executionRunRef: executionRunReadModel.run.executionRunRef,
      artifactKind: 'backend_response',
      redactionState: 'partial',
      redactionReason: 'sensitive_tokens_masked',
      storageRef: 'trace://run_01/ta_02',
      inlinePayload: {
        excerpt: 'Response body withheld; summary retained.'
      },
      createdAt: '2026-04-24T09:03:12.000Z'
    },
    executionRun: executionRunReadModel.run,
    channelRef: 'ch_01',
    payloadSummary: 'Backend response summary retained for bounded diagnostics.'
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

test('control-plane execution-run read model parses representative diagnostics payload', () => {
  const parsed = controlPlaneExecutionRunReadModelSchema.parse(
    createRepresentativeExecutionRunReadModelPayload()
  );

  assert.equal(parsed.run.executionRunRef, 'run_01');
  assert.equal(parsed.run.status, 'completed');
  assert.equal(parsed.steps.length, 2);
  assert.equal(parsed.linkedArtifacts[0]?.traceArtifactRef, 'ta_01');
  assert.equal(parsed.usageSummary?.totalTokens, 208);
});

test('control-plane surface list readback parses representative cp-runs payload', () => {
  const parsed = controlPlaneSurfaceListReadbackSchema.parse({
    surfaceId: 'cp-runs',
    payload: {
      items: [createRepresentativeExecutionRunReadModelPayload()],
      page: {
        limit: 25
      },
      meta: {
        generatedAt: '2026-04-24T09:04:00.000Z'
      }
    }
  });

  assert.equal(parsed.surfaceId, 'cp-runs');
  if (parsed.surfaceId !== 'cp-runs') {
    assert.fail('Expected cp-runs surface payload.');
  }

  assert.equal(parsed.payload.items.length, 1);
  assert.equal(parsed.payload.items[0]?.run.executionRunRef, 'run_01');
});

test('control-plane trace-artifact read model parses representative diagnostics payload', () => {
  const parsed = controlPlaneTraceArtifactReadModelSchema.parse(
    createRepresentativeTraceArtifactReadModelPayload()
  );

  assert.equal(parsed.artifact.traceArtifactRef, 'ta_02');
  assert.equal(parsed.artifact.redactionState, 'partial');
  assert.equal(parsed.executionRun?.executionRunRef, 'run_01');
  assert.equal(
    parsed.payloadSummary,
    'Backend response summary retained for bounded diagnostics.'
  );
});

test('control-plane surface list readback parses representative cp-trace-artifacts payload', () => {
  const parsed = controlPlaneSurfaceListReadbackSchema.parse({
    surfaceId: 'cp-trace-artifacts',
    payload: {
      items: [createRepresentativeTraceArtifactReadModelPayload()],
      page: {
        limit: 25
      },
      meta: {
        generatedAt: '2026-04-24T09:04:15.000Z'
      }
    }
  });

  assert.equal(parsed.surfaceId, 'cp-trace-artifacts');
  if (parsed.surfaceId !== 'cp-trace-artifacts') {
    assert.fail('Expected cp-trace-artifacts surface payload.');
  }

  assert.equal(parsed.payload.items.length, 1);
  assert.equal(parsed.payload.items[0]?.artifact.traceArtifactRef, 'ta_02');
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

test('control-plane execution-run read model rejects invalid step status', () => {
  const validPayload = createRepresentativeExecutionRunReadModelPayload();
  const invalidPayload = {
    ...validPayload,
    steps: validPayload.steps.map((step, index) =>
      index === 0
        ? {
            ...step,
            status: 'queued'
          }
        : step
    )
  };

  assert.throws(() =>
    controlPlaneExecutionRunReadModelSchema.parse(invalidPayload)
  );
});

test('control-plane trace-artifact surface list readback rejects invalid redaction state', () => {
  const validPayload = createRepresentativeTraceArtifactReadModelPayload();
  const invalidPayload = {
    surfaceId: 'cp-trace-artifacts',
    payload: {
      items: [
        {
          ...validPayload,
          artifact: {
            ...validPayload.artifact,
            redactionState: 'redacted'
          }
        }
      ],
      page: {
        limit: 25
      },
      meta: {
        generatedAt: '2026-04-24T09:04:30.000Z'
      }
    }
  };

  assert.throws(() => controlPlaneSurfaceListReadbackSchema.parse(invalidPayload));
});
