export type ScenarioTranscriptAttachmentKind = 'photo' | 'document' | 'audio' | 'video' | 'other';
export type ScenarioTranscriptAuthorKind = 'customer' | 'bot' | 'operator' | 'system';
export type ScenarioTranscriptActorRole = 'customer' | 'company' | 'system';
export type ScenarioTranscriptActorMode = 'bot' | 'operator' | 'hybrid' | null;

export interface ScenarioTranscriptAttachment {
  kind: ScenarioTranscriptAttachmentKind;
  title?: string | null;
  description?: string | null;
  status?: string | null;
  sourceRef?: string | null;
  storageRef?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  included?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ScenarioTranscriptTurn {
  turnId: string;
  actorId: string;
  actorRole: ScenarioTranscriptActorRole;
  actorMode: ScenarioTranscriptActorMode;
  externalMessageRef?: string | null;
  replyToTurnId?: string | null;
  replyToExternalMessageRef?: string | null;
  timestamp?: string | null;
  text: string;
  attachments: ScenarioTranscriptAttachment[];
}

export interface ScenarioTranscriptHistoricalSummary {
  summaryRef: string;
  summaryText: string;
  knownFacts: string[];
  productsMentioned: string[];
  customerGoals: string[];
}

export interface ScenarioTranscriptTraceRef {
  ref: string;
  label?: string | null;
}

export interface ScenarioTranscript {
  conversation: {
    conversationId: string;
    channel?: string | null;
    threadRef?: string | null;
    source?: {
      type: string;
      environment?: string | null;
      exportedAt?: string | null;
    } | null;
  };
  participants: Array<{
    id: string;
    role: ScenarioTranscriptActorRole;
    actorMode: ScenarioTranscriptActorMode;
    label: string;
  }>;
  turns: ScenarioTranscriptTurn[];
  context: {
    domainNote?: string | null;
    stateSummary?: string | null;
    packedContextSummary?: string | null;
    historicalSummaries: ScenarioTranscriptHistoricalSummary[];
    traceRefs: ScenarioTranscriptTraceRef[];
  };
}

export interface SemanticTranscriptMessage {
  ref: string;
  author: ScenarioTranscriptAuthorKind;
  text: string;
  createdAt?: string;
}

function normalizeTurnAuthor(input: {
  actorRole: ScenarioTranscriptActorRole;
  actorMode: ScenarioTranscriptActorMode;
}): ScenarioTranscriptAuthorKind {
  if (input.actorRole === 'customer') {
    return 'customer';
  }

  if (input.actorRole === 'system') {
    return 'system';
  }

  return input.actorMode === 'operator' ? 'operator' : 'bot';
}

export function canonicalTranscriptToSemanticTranscript(
  transcript: ScenarioTranscript
): SemanticTranscriptMessage[] {
  return transcript.turns.map((turn) => ({
    ref: turn.turnId,
    author: normalizeTurnAuthor({
      actorRole: turn.actorRole,
      actorMode: turn.actorMode
    }),
    text: turn.text,
    ...(turn.timestamp ? { createdAt: turn.timestamp } : {})
  }));
}

export function latestCustomerCompanyPair(transcript: ScenarioTranscript) {
  const transcriptMessages = canonicalTranscriptToSemanticTranscript(transcript);
  const lastCustomerIndex = [...transcriptMessages]
    .map((message, index) => ({ message, index }))
    .reverse()
    .find(({ message }) => message.author === 'customer')?.index;

  if (lastCustomerIndex === undefined) {
    throw new Error('Canonical transcript requires at least one customer turn.');
  }

  const customerMessage = transcriptMessages[lastCustomerIndex]!;
  const companyReply =
    transcriptMessages
      .slice(lastCustomerIndex + 1)
      .find((message) => message.author === 'bot' || message.author === 'operator') ??
    [...transcriptMessages]
      .reverse()
      .find((message) => message.author === 'bot' || message.author === 'operator') ??
    null;

  if (!companyReply) {
    throw new Error('Canonical transcript requires at least one company reply.');
  }

  return {
    customerMessage,
    companyReply,
    transcriptMessages
  };
}

export function buildTranscriptStateSummary(transcript: ScenarioTranscript): string | null {
  if (transcript.context.stateSummary) {
    return transcript.context.stateSummary;
  }

  const summaries = transcript.context.historicalSummaries;

  if (summaries.length === 0) {
    return transcript.context.domainNote ?? null;
  }

  return summaries
    .map((summary) => [summary.summaryText, ...summary.knownFacts, ...summary.customerGoals].join(' '))
    .join(' ')
    .trim();
}

export function buildPackedContextSummary(transcript: ScenarioTranscript): string {
  return (
    transcript.context.packedContextSummary ??
    buildTranscriptStateSummary(transcript) ??
    `Conversation ${transcript.conversation.conversationId} exported for semantic judging.`
  );
}

export function buildTraceSummary(transcript: ScenarioTranscript): string | null {
  if (transcript.context.traceRefs.length === 0) {
    return null;
  }

  return transcript.context.traceRefs
    .map((trace) => (trace.label ? `${trace.ref}:${trace.label}` : trace.ref))
    .join(', ');
}
