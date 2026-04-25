import type { ControlPlaneCapabilityFamily } from './capabilities';
import type {
  ChannelRef,
  ExecutionRunRef,
  IsoTimestamp,
  MembershipRef,
  OverlayRefMap,
  PipelineId,
  PipelineBindingRef,
  PolicyAssignmentRef,
  PrincipalRef,
  ProductInstanceRef,
  SessionRef,
  TraceArtifactRef,
  UserRef,
  VersionToken,
  WorkspaceRef
} from './refs';

export type KnownPrincipalKind = 'operator' | 'automation';
export type PrincipalKind = KnownPrincipalKind | (string & {});

export type SessionStatus = 'active' | 'revoked' | 'expired' | 'replaced';

export type MembershipStatus = 'active' | 'revoked' | 'disabled';

export type WorkspaceStatus = 'active' | 'disabled';

export type ProductInstanceStatus = 'active' | 'disabled';

export type KnownChannelKind = 'telegram' | 'email' | 'bitrix24_bot';
export type ChannelKind = KnownChannelKind | (string & {});

export type PipelineBindingStatus =
  | 'unbound'
  | 'bound'
  | 'degraded'
  | 'disabled'
  | 'invalid';

export type ReplyThreadLinkingFidelity = 'none' | 'basic' | 'full';

export interface ChannelCapabilityMatrix {
  supportsSynchronousDelivery: boolean;
  supportsAsynchronousDelivery: boolean;
  supportsInbound: boolean;
  supportsOutbound: boolean;
  replyThreadLinkingFidelity: ReplyThreadLinkingFidelity;
  supportsAttachments: boolean;
  supportsOperatorCommands: boolean;
  supportsTransportDiagnostics: boolean;
}

export interface User {
  userRef: UserRef;
  email?: string | null;
  displayName?: string | null;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
}

export interface Principal {
  principalRef: PrincipalRef;
  principalKind: PrincipalKind;
  userRef?: UserRef | null;
  displayName?: string | null;
}

export interface Session {
  sessionRef: SessionRef;
  principalRef: PrincipalRef;
  workspaceRef?: WorkspaceRef | null;
  status: SessionStatus;
  issuedAt: IsoTimestamp;
  expiresAt?: IsoTimestamp | null;
  revokedAt?: IsoTimestamp | null;
  replacedBySessionRef?: SessionRef | null;
}

export interface Membership {
  membershipRef: MembershipRef;
  workspaceRef: WorkspaceRef;
  userRef: UserRef;
  status: MembershipStatus;
  capabilityFamilies: ControlPlaneCapabilityFamily[];
  roleOverlayRef?: string | null;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
}

export interface Workspace {
  workspaceRef: WorkspaceRef;
  status: WorkspaceStatus;
  displayName?: string | null;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
}

export interface ProductInstance {
  productInstanceRef: ProductInstanceRef;
  workspaceRef: WorkspaceRef;
  productKey: string;
  status: ProductInstanceStatus;
  displayName?: string | null;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
}

export interface ChannelTransportConfigSummary {
  transportKind: string;
  summary: Record<string, unknown>;
}

export interface PipelineBinding {
  pipelineBindingRef: PipelineBindingRef;
  channelRef: ChannelRef;
  channelKind: ChannelKind;
  pipelineId: PipelineId;
  bindingStatus: PipelineBindingStatus;
  pipelineArgs: Record<string, unknown>;
  policyAssignmentRef?: PolicyAssignmentRef | null;
  effectiveArgSchemaRef?: string | null;
  versionToken?: VersionToken | null;
  validatedAt?: IsoTimestamp | null;
  updatedAt: IsoTimestamp;
}

export interface Channel {
  channelRef: ChannelRef;
  workspaceRef: WorkspaceRef;
  productInstanceRef: ProductInstanceRef;
  channelKind: ChannelKind;
  entryPipelineId: PipelineId;
  bindingStatus: PipelineBindingStatus;
  transportConfigSummary: ChannelTransportConfigSummary;
  capabilityMatrix: ChannelCapabilityMatrix;
  policyAssignmentRef?: PolicyAssignmentRef | null;
  overlayRefs?: OverlayRefMap;
  pipelineBinding?: PipelineBinding | null;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
}

export type ExecutionRunStatus =
  | 'accepted'
  | 'running'
  | 'completed'
  | 'blocked'
  | 'failed';

export interface ExecutionUsageSummary {
  inputTokens?: number | null;
  outputTokens?: number | null;
  cacheReadTokens?: number | null;
  cacheWriteTokens?: number | null;
  totalTokens?: number | null;
}

export interface ExecutionRun {
  executionRunRef: ExecutionRunRef;
  workspaceRef: WorkspaceRef;
  productInstanceRef: ProductInstanceRef;
  channelRef?: ChannelRef | null;
  pipelineId?: PipelineId | null;
  workflowFamily: string;
  status: ExecutionRunStatus;
  acceptedBindingSnapshot?: ExecutionRunBindingSnapshot | null;
  attemptCount: number;
  retryCount: number;
  failoverCount: number;
  usageSummary?: ExecutionUsageSummary;
  traceArtifactRefs: TraceArtifactRef[];
  startedAt: IsoTimestamp;
  completedAt?: IsoTimestamp | null;
}

export interface ExecutionRunBindingSnapshot {
  channelRef: ChannelRef;
  pipelineBindingRef?: PipelineBindingRef | null;
  pipelineId: PipelineId;
  bindingStatus: PipelineBindingStatus;
  pipelineArgs: Record<string, unknown>;
  policyAssignmentRef?: PolicyAssignmentRef | null;
  capturedAt: IsoTimestamp;
}

export type KnownTraceArtifactKind =
  | 'rendered_prompt'
  | 'packed_context'
  | 'retrieved_evidence'
  | 'backend_request'
  | 'backend_response'
  | 'normalized_tool_input'
  | 'normalized_tool_output'
  | 'verification_bundle'
  | 'human_readable_report';

export type TraceArtifactKind = KnownTraceArtifactKind | (string & {});

export type TraceArtifactRedactionState = 'none' | 'partial' | 'full' | 'blocked';

export interface TraceArtifact {
  traceArtifactRef: TraceArtifactRef;
  executionRunRef: ExecutionRunRef;
  artifactKind: TraceArtifactKind;
  redactionState: TraceArtifactRedactionState;
  redactionReason?: string | null;
  storageRef?: string | null;
  inlinePayload?: Record<string, unknown> | null;
  createdAt: IsoTimestamp;
}
