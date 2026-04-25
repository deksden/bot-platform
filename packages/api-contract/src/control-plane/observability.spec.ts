import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  controlPlaneObservabilityEventBatchSchema,
  controlPlaneObservabilityEventSchema
} from './observability';

function createRepresentativeControlPlaneObservabilityBatchPayload() {
  return {
    items: [
      {
        level: 'info',
        event: 'diagnostics_read',
        service: 'control-plane',
        requestId: 'req_01',
        correlationId: 'corr_01',
        operationId: 'op_01',
        workspaceRef: 'ws_01',
        productInstanceRef: 'pi_01',
        channelRef: 'ch_01',
        actorRef: 'principal_01',
        executionRunRef: 'run_01',
        traceArtifactRef: null,
        env: 'beta',
        release: '2026.04.24-1',
        route: '/api/control-plane/runs/run_01',
        method: 'GET',
        details: {
          surfaceId: 'cp-runs'
        },
        occurredAt: '2026-04-24T12:20:00.000Z'
      },
      {
        level: 'info',
        event: 'trace_artifact_read',
        service: 'control-plane',
        requestId: 'req_01',
        correlationId: 'corr_01',
        operationId: 'op_02',
        workspaceRef: 'ws_01',
        productInstanceRef: 'pi_01',
        channelRef: 'ch_01',
        actorRef: 'principal_01',
        executionRunRef: 'run_01',
        traceArtifactRef: 'ta_01',
        env: 'beta',
        release: '2026.04.24-1',
        route: '/api/control-plane/trace-artifacts/ta_01',
        method: 'GET',
        details: {
          redactionState: 'partial'
        },
        occurredAt: '2026-04-24T12:20:03.000Z'
      },
      {
        level: 'warn',
        event: 'compat_fallback_used',
        service: 'control-plane',
        requestId: 'req_01',
        correlationId: 'corr_01',
        operationId: 'op_03',
        workspaceRef: 'ws_01',
        productInstanceRef: 'pi_01',
        channelRef: 'ch_01',
        actorRef: 'principal_01',
        executionRunRef: 'run_01',
        traceArtifactRef: null,
        env: 'beta',
        release: '2026.04.24-1',
        route: '/api/control-plane/channels/ch_01',
        method: 'PATCH',
        details: {
          fallbackKind: 'legacy_integration_alias',
          compatibilityPath: 'integration.channel'
        },
        occurredAt: '2026-04-24T12:20:05.000Z'
      }
    ],
    meta: {
      requestId: 'req_01',
      correlationId: 'corr_01',
      generatedAt: '2026-04-24T12:21:00.000Z'
    }
  };
}

test('control-plane observability event batch parses representative diagnostics payload', () => {
  const parsed = controlPlaneObservabilityEventBatchSchema.parse(
    createRepresentativeControlPlaneObservabilityBatchPayload()
  );

  assert.equal(parsed.items.length, 3);
  assert.equal(parsed.items[0]?.event, 'diagnostics_read');
  assert.equal(parsed.items[1]?.traceArtifactRef, 'ta_01');
  assert.equal(parsed.items[2]?.details.fallbackKind, 'legacy_integration_alias');
});

test('control-plane observability event rejects diagnostics read without target context', () => {
  const invalidPayload = {
    level: 'info',
    event: 'diagnostics_read',
    service: 'control-plane',
    requestId: 'req_02',
    correlationId: 'corr_02',
    operationId: 'op_04',
    workspaceRef: null,
    productInstanceRef: null,
    channelRef: null,
    actorRef: 'principal_01',
    executionRunRef: null,
    traceArtifactRef: null,
    env: 'local',
    release: null,
    route: '/api/control-plane/runs',
    method: 'GET',
    details: {},
    occurredAt: '2026-04-24T12:22:00.000Z'
  };

  assert.throws(() => controlPlaneObservabilityEventSchema.parse(invalidPayload));
});

test('control-plane observability event rejects trace artifact read without artifact ref', () => {
  const invalidPayload = {
    level: 'info',
    event: 'trace_artifact_read',
    service: 'control-plane',
    requestId: 'req_03',
    correlationId: 'corr_03',
    operationId: 'op_05',
    workspaceRef: 'ws_01',
    productInstanceRef: 'pi_01',
    channelRef: 'ch_01',
    actorRef: 'principal_01',
    executionRunRef: 'run_01',
    traceArtifactRef: null,
    env: 'beta',
    release: '2026.04.24-1',
    route: '/api/control-plane/trace-artifacts',
    method: 'GET',
    details: {},
    occurredAt: '2026-04-24T12:23:00.000Z'
  };

  assert.throws(() => controlPlaneObservabilityEventSchema.parse(invalidPayload));
});

test('control-plane observability event rejects fallback event without fallbackKind', () => {
  const invalidPayload = {
    level: 'warn',
    event: 'compat_fallback_used',
    service: 'control-plane',
    requestId: 'req_04',
    correlationId: 'corr_04',
    operationId: 'op_06',
    workspaceRef: 'ws_01',
    productInstanceRef: 'pi_01',
    channelRef: 'ch_01',
    actorRef: 'principal_01',
    executionRunRef: 'run_01',
    traceArtifactRef: null,
    env: 'beta',
    release: '2026.04.24-1',
    route: '/api/control-plane/channels/ch_01',
    method: 'PATCH',
    details: {},
    occurredAt: '2026-04-24T12:24:00.000Z'
  };

  assert.throws(() => controlPlaneObservabilityEventSchema.parse(invalidPayload));
});
