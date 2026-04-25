import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createControlPlaneObservabilityEvent,
  resolveControlPlaneObservabilityLevel
} from './observability';

test('control-plane observability helper defaults compat fallback to warn', () => {
  const event = createControlPlaneObservabilityEvent({
    event: 'compat_fallback_used',
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
    route: '/api/control-plane/channels/ch_01',
    method: 'PATCH',
    details: {
      fallbackKind: 'legacy_integration_alias',
      compatibilityPath: 'integration.channel'
    },
    occurredAt: '2026-04-24T12:10:00.000Z'
  });

  assert.equal(resolveControlPlaneObservabilityLevel('compat_fallback_used'), 'warn');
  assert.equal(event.level, 'warn');
  assert.equal(event.details.fallbackKind, 'legacy_integration_alias');
});

test('control-plane observability helper defaults trace artifact read to info', () => {
  const event = createControlPlaneObservabilityEvent({
    event: 'trace_artifact_read',
    service: 'control-plane',
    requestId: 'req_02',
    correlationId: 'corr_02',
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
    occurredAt: '2026-04-24T12:11:00.000Z'
  });

  assert.equal(event.level, 'info');
  assert.equal(event.traceArtifactRef, 'ta_01');
  assert.equal(event.requestId, 'req_02');
});

test('control-plane observability helper honors explicit level override', () => {
  const event = createControlPlaneObservabilityEvent({
    event: 'channel_binding_rejected',
    level: 'error',
    service: 'control-plane',
    requestId: null,
    correlationId: null,
    operationId: 'op_03',
    workspaceRef: 'ws_01',
    productInstanceRef: 'pi_01',
    channelRef: 'ch_02',
    actorRef: 'principal_01',
    executionRunRef: null,
    traceArtifactRef: null,
    env: 'local',
    release: null,
    route: null,
    method: null,
    details: {
      issueCode: 'unsupported_channel_kind'
    },
    occurredAt: '2026-04-24T12:12:00.000Z'
  });

  assert.equal(event.level, 'error');
  assert.equal(event.channelRef, 'ch_02');
  assert.equal(event.details.issueCode, 'unsupported_channel_kind');
});
