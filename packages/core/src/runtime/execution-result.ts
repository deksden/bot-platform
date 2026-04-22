import type {
  ExecutionRequest,
  ExecutionResult,
  ExecutionSessionStatus,
  ExecutionTrace,
  ExecutionTraceStatus,
  ResultIntent,
  ResultIntentKind,
  ResultIntentStatus
} from './kernel';
import { buildExecutionSession, createResultIntent } from './kernel';

export function deriveResultIntentStatusFromTraceStatus(
  traceStatus: ExecutionTraceStatus
): ResultIntentStatus {
  return traceStatus === 'completed' ? 'ready' : 'blocked';
}

export function hasBlockedResultIntents(
  resultIntents: ReadonlyArray<Pick<ResultIntent, 'status'>>
): boolean {
  return resultIntents.some((resultIntent) => resultIntent.status === 'blocked');
}

export function deriveExecutionSessionStatus(input: {
  traceStatus: ExecutionTraceStatus;
  resultIntents?: ReadonlyArray<Pick<ResultIntent, 'status'>>;
}): ExecutionSessionStatus {
  if (input.traceStatus !== 'completed') {
    return 'blocked';
  }

  return hasBlockedResultIntents(input.resultIntents ?? []) ? 'blocked' : 'completed';
}

export function createExecutionTrace<TMetadata = Record<string, unknown>>(input: {
  workflowFamily: ExecutionTrace['workflowFamily'];
  status: ExecutionTraceStatus;
  traceId: string;
  metadata?: TMetadata;
}): ExecutionTrace<TMetadata> {
  return {
    traceId: input.traceId,
    workflowFamily: input.workflowFamily,
    status: input.status,
    ...(input.metadata !== undefined ? { metadata: input.metadata } : {})
  };
}

export function createTraceLinkedResultIntent<TPayload>(input: {
  kind: ResultIntentKind;
  payload: TPayload;
  trace?: Pick<ExecutionTrace, 'traceId' | 'status'> | null;
  traceId?: string | null;
  status?: ResultIntentStatus;
  intentId?: string;
}): ResultIntent<TPayload> {
  const traceId = input.trace?.traceId ?? input.traceId ?? null;
  const status =
    input.status ??
    (input.trace ? deriveResultIntentStatusFromTraceStatus(input.trace.status) : 'ready');

  return createResultIntent({
    kind: input.kind,
    payload: input.payload,
    status,
    traceId,
    ...(input.intentId ? { intentId: input.intentId } : {})
  });
}

export function buildExecutionResultFromTrace<
  TPayload = Record<string, unknown>,
  TTraceMetadata = Record<string, unknown>
>(input: {
  request: Pick<ExecutionRequest, 'requestId' | 'executionMode' | 'agentProfile' | 'subject'>;
  trace: ExecutionTrace<TTraceMetadata>;
  resultIntents?: ResultIntent[];
  payload?: TPayload | null;
  sessionStatus?: ExecutionSessionStatus;
  startedAt?: string;
  completedAt?: string;
  executionSessionId?: string;
}): ExecutionResult<TPayload, TTraceMetadata> {
  const resultIntents = input.resultIntents ?? [];
  const sessionStatus =
    input.sessionStatus ??
    deriveExecutionSessionStatus({
      traceStatus: input.trace.status,
      resultIntents
    });

  return {
    session: buildExecutionSession({
      request: input.request,
      status: sessionStatus,
      ...(input.startedAt ? { startedAt: input.startedAt } : {}),
      ...(input.completedAt ? { completedAt: input.completedAt } : {}),
      ...(input.executionSessionId ? { executionSessionId: input.executionSessionId } : {})
    }),
    trace: input.trace,
    resultIntents,
    payload: input.payload ?? null
  };
}
