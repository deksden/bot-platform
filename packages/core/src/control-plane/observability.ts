import type {
  ChannelRef,
  ExecutionRunRef,
  IsoTimestamp,
  PrincipalRef,
  ProductInstanceRef,
  TraceArtifactRef,
  WorkspaceRef
} from './refs';

export const CONTROL_PLANE_OBSERVABILITY_EVENT_NAMES = [
  'membership_read',
  'membership_updated',
  'session_revoked',
  'channel_binding_validated',
  'channel_binding_updated',
  'channel_binding_rejected',
  'policy_assignment_updated',
  'diagnostics_read',
  'trace_artifact_read',
  'compat_fallback_used'
] as const;

export type ControlPlaneObservabilityEventName =
  (typeof CONTROL_PLANE_OBSERVABILITY_EVENT_NAMES)[number];

export type ControlPlaneObservabilityLevel = 'info' | 'warn' | 'error';

export interface ControlPlaneObservabilityEvent {
  level: ControlPlaneObservabilityLevel;
  event: ControlPlaneObservabilityEventName;
  service: string;
  requestId: string | null;
  correlationId: string | null;
  operationId: string | null;
  workspaceRef: WorkspaceRef | null;
  productInstanceRef: ProductInstanceRef | null;
  channelRef: ChannelRef | null;
  actorRef: PrincipalRef | null;
  executionRunRef: ExecutionRunRef | null;
  traceArtifactRef: TraceArtifactRef | null;
  env: string | null;
  release: string | null;
  route: string | null;
  method: string | null;
  details: Record<string, unknown>;
  occurredAt: IsoTimestamp;
}

const DEFAULT_LEVEL_BY_EVENT: Record<
  ControlPlaneObservabilityEventName,
  ControlPlaneObservabilityLevel
> = {
  membership_read: 'info',
  membership_updated: 'info',
  session_revoked: 'info',
  channel_binding_validated: 'info',
  channel_binding_updated: 'info',
  channel_binding_rejected: 'warn',
  policy_assignment_updated: 'info',
  diagnostics_read: 'info',
  trace_artifact_read: 'info',
  compat_fallback_used: 'warn'
};

export function resolveControlPlaneObservabilityLevel(
  event: ControlPlaneObservabilityEventName
): ControlPlaneObservabilityLevel {
  return DEFAULT_LEVEL_BY_EVENT[event];
}

export function createControlPlaneObservabilityEvent(
  input: Omit<ControlPlaneObservabilityEvent, 'level'> & {
    level?: ControlPlaneObservabilityLevel;
  }
): ControlPlaneObservabilityEvent {
  return {
    level: input.level ?? resolveControlPlaneObservabilityLevel(input.event),
    event: input.event,
    service: input.service,
    requestId: input.requestId ?? null,
    correlationId: input.correlationId ?? null,
    operationId: input.operationId ?? null,
    workspaceRef: input.workspaceRef ?? null,
    productInstanceRef: input.productInstanceRef ?? null,
    channelRef: input.channelRef ?? null,
    actorRef: input.actorRef ?? null,
    executionRunRef: input.executionRunRef ?? null,
    traceArtifactRef: input.traceArtifactRef ?? null,
    env: input.env ?? null,
    release: input.release ?? null,
    route: input.route ?? null,
    method: input.method ?? null,
    details: input.details ?? {},
    occurredAt: input.occurredAt
  };
}
