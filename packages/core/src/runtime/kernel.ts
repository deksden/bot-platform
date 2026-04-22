import { randomUUID } from 'node:crypto';

export type ExecutionWorkflowFamily =
  | 'seller_conversation'
  | 'draft_review'
  | 'research_then_answer';

export type KnownCapabilityModuleId =
  | 'review-message'
  | 'handoff-request'
  | 'memory-bank-search'
  | 'document-read'
  | 'email-compose';

export type CapabilityModuleId = KnownCapabilityModuleId | (string & {});

export type ExecutionDeliveryMode =
  | 'direct_delivery'
  | 'draft_artifact'
  | 'knowledge_answer';

export type ExecutionMode = 'reply' | 'draft';

export type ExecutionSessionStatus = 'completed' | 'blocked';

export type ResultIntentKind =
  | 'send_message'
  | 'send_email'
  | 'create_artifact'
  | 'schedule_task'
  | 'handoff_request'
  | 'update_state';

export type ResultIntentStatus = 'ready' | 'blocked';

export type ExecutionTraceStatus = 'completed' | 'blocked' | 'failed';

export interface AgentProfile {
  profileId: string;
  workflowFamily: ExecutionWorkflowFamily;
  capabilityModuleIds: CapabilityModuleId[];
  deliveryMode: ExecutionDeliveryMode;
  metadata?: Record<string, unknown>;
}

export interface ExecutionActorContext {
  actorRef?: string | null;
  accessRef?: string | null;
}

export interface ExecutionOwnershipContext {
  workspaceRef?: string | null;
  productInstanceRef?: string | null;
  tenantRef?: string | null;
}

export interface ExecutionChannelContext {
  channelRef?: string | null;
  integrationRef?: string | null;
  threadRef?: string | null;
}

export interface ExecutionPipelineContext {
  workflowFamily: ExecutionWorkflowFamily;
  pipelineId?: string | null;
  bindingRef?: string | null;
  policyPackRef?: string | null;
}

export interface ExecutionSubject {
  subjectKind: 'conversation_message' | 'task' | 'document' | 'event';
  subjectId?: string | null;
  correlationRef?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ExecutionContext {
  actor?: ExecutionActorContext;
  ownership?: ExecutionOwnershipContext;
  channel?: ExecutionChannelContext;
  pipeline: ExecutionPipelineContext;
  metadata?: Record<string, unknown>;
}

export interface ExecutionRequest<TInput = Record<string, unknown>> {
  requestId: string;
  executionMode: ExecutionMode;
  agentProfile: AgentProfile;
  subject: ExecutionSubject;
  input: TInput;
  context?: ExecutionContext;
}

export interface ExecutionSession {
  executionSessionId: string;
  requestId: string;
  subjectId: string | null;
  workflowFamily: ExecutionWorkflowFamily;
  executionMode: ExecutionMode;
  agentProfileId: string;
  status: ExecutionSessionStatus;
  startedAt: string;
  completedAt: string;
}

export interface ExecutionTrace<TMetadata = Record<string, unknown>> {
  traceId: string;
  workflowFamily: ExecutionWorkflowFamily;
  status: ExecutionTraceStatus;
  metadata?: TMetadata;
}

export interface ResultIntent<TPayload = Record<string, unknown>> {
  intentId: string;
  kind: ResultIntentKind;
  status: ResultIntentStatus;
  traceId: string | null;
  payload: TPayload;
}

export interface ExecutionResult<
  TPayload = Record<string, unknown>,
  TTraceMetadata = Record<string, unknown>
> {
  session: ExecutionSession;
  trace: ExecutionTrace<TTraceMetadata>;
  resultIntents: ResultIntent[];
  payload: TPayload | null;
}

export interface ExecutionWorkflowHandler {
  execute(request: ExecutionRequest): Promise<ExecutionResult>;
}

export interface AgentExecutionKernel {
  execute(request: ExecutionRequest): Promise<ExecutionResult>;
}

const DEFAULT_DELIVERY_MODE_BY_WORKFLOW_FAMILY: Record<
  ExecutionWorkflowFamily,
  ExecutionDeliveryMode
> = {
  seller_conversation: 'direct_delivery',
  draft_review: 'draft_artifact',
  research_then_answer: 'knowledge_answer'
};

const DEFAULT_CAPABILITY_MODULES_BY_WORKFLOW_FAMILY: Record<
  ExecutionWorkflowFamily,
  CapabilityModuleId[]
> = {
  seller_conversation: ['review-message', 'handoff-request'],
  draft_review: ['review-message', 'handoff-request'],
  research_then_answer: ['memory-bank-search', 'document-read', 'email-compose']
};

export function buildDefaultAgentProfile(input: {
  workflowFamily: ExecutionWorkflowFamily;
  profileId?: string;
  capabilityModuleIds?: CapabilityModuleId[];
  deliveryMode?: ExecutionDeliveryMode;
  metadata?: Record<string, unknown>;
}): AgentProfile {
  return {
    profileId: input.profileId ?? `${input.workflowFamily}.default`,
    workflowFamily: input.workflowFamily,
    capabilityModuleIds: [
      ...(input.capabilityModuleIds ??
        DEFAULT_CAPABILITY_MODULES_BY_WORKFLOW_FAMILY[input.workflowFamily])
    ],
    deliveryMode:
      input.deliveryMode ?? DEFAULT_DELIVERY_MODE_BY_WORKFLOW_FAMILY[input.workflowFamily],
    ...(input.metadata !== undefined ? { metadata: input.metadata } : {})
  };
}

export function resolveWorkflowFamilyForMode(input: {
  mode: ExecutionMode;
  replyWorkflowFamily?: Extract<
    ExecutionWorkflowFamily,
    'seller_conversation' | 'research_then_answer'
  >;
  draftWorkflowFamily?: Extract<ExecutionWorkflowFamily, 'draft_review'>;
}): ExecutionWorkflowFamily {
  if (input.mode === 'draft') {
    return input.draftWorkflowFamily ?? 'draft_review';
  }

  return input.replyWorkflowFamily ?? 'seller_conversation';
}

export function buildExecutionRequest<TInput>(input: {
  requestId?: string;
  executionMode: ExecutionMode;
  subject: ExecutionSubject;
  input: TInput;
  workflowFamily?: ExecutionWorkflowFamily;
  agentProfile?: AgentProfile;
  context?: ExecutionContext;
}): ExecutionRequest<TInput> {
  const workflowFamily =
    input.agentProfile?.workflowFamily ??
    input.workflowFamily ??
    resolveWorkflowFamilyForMode({ mode: input.executionMode });

  return {
    requestId: input.requestId ?? randomUUID(),
    executionMode: input.executionMode,
    agentProfile: input.agentProfile ?? buildDefaultAgentProfile({ workflowFamily }),
    subject: input.subject,
    input: input.input,
    ...(input.context !== undefined
      ? { context: input.context }
      : {
          context: {
            pipeline: {
              workflowFamily
            }
          }
        })
  };
}

export function buildExecutionSession(input: {
  request: Pick<ExecutionRequest, 'requestId' | 'executionMode' | 'agentProfile' | 'subject'>;
  status: ExecutionSessionStatus;
  startedAt?: string;
  completedAt?: string;
  executionSessionId?: string;
}): ExecutionSession {
  const startedAt = input.startedAt ?? new Date().toISOString();

  return {
    executionSessionId: input.executionSessionId ?? randomUUID(),
    requestId: input.request.requestId,
    subjectId: input.request.subject.subjectId ?? null,
    workflowFamily: input.request.agentProfile.workflowFamily,
    executionMode: input.request.executionMode,
    agentProfileId: input.request.agentProfile.profileId,
    status: input.status,
    startedAt,
    completedAt: input.completedAt ?? startedAt
  };
}

export function createResultIntent<TPayload>(input: {
  kind: ResultIntentKind;
  payload: TPayload;
  status?: ResultIntentStatus;
  traceId?: string | null;
  intentId?: string;
}): ResultIntent<TPayload> {
  return {
    intentId: input.intentId ?? randomUUID(),
    kind: input.kind,
    status: input.status ?? 'ready',
    traceId: input.traceId ?? null,
    payload: input.payload
  };
}

export function createAgentExecutionKernel(input: {
  handlers: Partial<Record<ExecutionWorkflowFamily, ExecutionWorkflowHandler>>;
}): AgentExecutionKernel {
  return {
    async execute(request) {
      const workflowFamily = request.agentProfile.workflowFamily;
      const handler = input.handlers[workflowFamily];

      if (!handler) {
        throw new Error(
          `Workflow family ${workflowFamily} is not configured in the execution kernel.`
        );
      }

      return handler.execute(request);
    }
  };
}
