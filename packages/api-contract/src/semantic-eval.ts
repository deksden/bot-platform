import { z } from 'zod';
import { runtimeUsageSchema } from './runtime';

const nullableTextSchema = z.string().min(1).nullable().default(null);

export const semanticEvalTargetKindSchema = z.enum(['turn', 'journey']);
export const semanticEvalContextPolicySchema = z.enum([
  'minimal_only',
  'allow_windowed',
  'allow_full'
]);
export const semanticEvalContextLevelSchema = z.enum(['minimal', 'windowed', 'full']);
export const semanticEvalVerdictSchema = z.enum([
  'pass',
  'soft_fail',
  'fail',
  'inconclusive',
  'contract_error'
]);
export const semanticEvalFindingStatusSchema = z.enum([
  'matched',
  'missed',
  'violated',
  'ambiguous'
]);

export const semanticEvidenceRefSchema = z.object({
  ref: z.string().min(1),
  label: nullableTextSchema
});

export type SemanticEvidenceRef = z.infer<typeof semanticEvidenceRefSchema>;

export const semanticExpectationClauseSchema = z.object({
  expectationId: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  evidenceHints: z.array(z.string().min(1)).default([]),
  weight: z.number().min(0).max(1).default(1)
});

export type SemanticExpectationClause = z.infer<typeof semanticExpectationClauseSchema>;

export const expectationContractSchema = z.object({
  contractId: z.string().min(1),
  contractVersion: z.string().min(1),
  kind: semanticEvalTargetKindSchema,
  stageLabel: z.string().min(1),
  contextPolicy: semanticEvalContextPolicySchema,
  evaluationQuestion: z.string().min(1),
  goodSignals: z.array(semanticExpectationClauseSchema).default([]),
  badSignals: z.array(semanticExpectationClauseSchema).default([]),
  mustDo: z.array(semanticExpectationClauseSchema).default([]),
  mustNotDo: z.array(semanticExpectationClauseSchema).default([]),
  domainAnchors: z.array(z.string().min(1)).default([]),
  expectedNextStepKinds: z.array(z.string().min(1)).default([]),
  forbiddenMoves: z.array(z.string().min(1)).default([]),
  notes: nullableTextSchema
});

export type ExpectationContract = z.infer<typeof expectationContractSchema>;

export const semanticEvalMessageSchema = z.object({
  ref: z.string().min(1),
  author: z.enum(['customer', 'bot', 'operator', 'system']),
  text: z.string().min(1),
  createdAt: nullableTextSchema
});

export type SemanticEvalMessage = z.infer<typeof semanticEvalMessageSchema>;

export const semanticEvalEvidenceIndexEntrySchema = z.object({
  ref: z.string().min(1),
  label: z.string().min(1),
  content: nullableTextSchema,
  metadata: z.record(z.string(), z.unknown()).default({})
});

export type SemanticEvalEvidenceIndexEntry = z.infer<typeof semanticEvalEvidenceIndexEntrySchema>;

export const semanticJudgeFocusSelectionSchema = z.object({
  source: z.enum(['transcript_focus', 'episode_signal', 'last_pair', 'whole_dialog']),
  explanation: nullableTextSchema
});

export type SemanticJudgeFocusSelection = z.infer<typeof semanticJudgeFocusSelectionSchema>;

export const semanticJudgeEpisodeContextSchema = z.object({
  localTurns: z.array(semanticEvalMessageSchema).default([]),
  segmentTurns: z.array(semanticEvalMessageSchema).default([]),
  localSummary: nullableTextSchema,
  segmentSummary: nullableTextSchema
});

export type SemanticJudgeEpisodeContext = z.infer<typeof semanticJudgeEpisodeContextSchema>;

export const semanticJudgeSemanticContextSchema = z.object({
  conversationSummary: nullableTextSchema,
  timelineHint: nullableTextSchema,
  productHints: z.array(z.string().min(1)).default([]),
  customerGoalHints: z.array(z.string().min(1)).default([]),
  knownFactHints: z.array(z.string().min(1)).default([]),
  businessSignals: z.array(z.string().min(1)).default([])
});

export type SemanticJudgeSemanticContext = z.infer<typeof semanticJudgeSemanticContextSchema>;

const semanticJudgePacketBaseSchema = z.object({
  scenarioId: z.string().min(1),
  scenarioRunId: z.string().min(1),
  targetId: z.string().min(1),
  targetKind: semanticEvalTargetKindSchema,
  contextPacketHash: z.string().min(1),
  expectationContract: expectationContractSchema,
  customerMessage: semanticEvalMessageSchema.nullable().default(null),
  botReply: semanticEvalMessageSchema.nullable().default(null),
  evidenceIndex: z.array(semanticEvalEvidenceIndexEntrySchema).default([]),
  focusSelection: semanticJudgeFocusSelectionSchema.nullable().default(null),
  episodeContext: semanticJudgeEpisodeContextSchema.nullable().default(null),
  semanticContext: semanticJudgeSemanticContextSchema.nullable().default(null)
});

export const semanticJudgeInputMinimalSchema = semanticJudgePacketBaseSchema.extend({
  contextLevel: z.literal('minimal'),
  minimalContext: z.object({
    stageLabel: z.string().min(1),
    domainNote: nullableTextSchema
  })
});

export const semanticJudgeInputWindowedSchema = semanticJudgePacketBaseSchema.extend({
  contextLevel: z.literal('windowed'),
  windowedContext: z.object({
    stageLabel: z.string().min(1),
    recentTurns: z.array(semanticEvalMessageSchema).default([]),
    stateSummary: nullableTextSchema
  })
});

export const semanticJudgeInputFullSchema = semanticJudgePacketBaseSchema.extend({
  contextLevel: z.literal('full'),
  fullContext: z.object({
    stageLabel: z.string().min(1),
    packedContextSummary: z.string().min(1),
    traceSummary: nullableTextSchema,
    recentTurns: z.array(semanticEvalMessageSchema).default([])
  })
});

export const semanticJudgeInputPacketSchema = z.discriminatedUnion('contextLevel', [
  semanticJudgeInputMinimalSchema,
  semanticJudgeInputWindowedSchema,
  semanticJudgeInputFullSchema
]);

export type SemanticJudgeInputPacket = z.infer<typeof semanticJudgeInputPacketSchema>;

export const semanticJudgeFindingSchema = z.object({
  expectationId: z.string().min(1),
  status: semanticEvalFindingStatusSchema,
  because: z.string().min(1),
  evidenceRefs: z.array(semanticEvidenceRefSchema).default([])
});

export type SemanticJudgeFinding = z.infer<typeof semanticJudgeFindingSchema>;

export const semanticJudgeContractErrorSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  evidenceRefs: z.array(semanticEvidenceRefSchema).default([])
});

export type SemanticJudgeContractError = z.infer<typeof semanticJudgeContractErrorSchema>;

export const semanticJudgeResultSchema = z.object({
  decision: z.object({
    verdict: semanticEvalVerdictSchema,
    confidence: z.number().min(0).max(1),
    score: z.number().min(0).max(1),
    summary: z.string().min(1),
    contractId: z.string().min(1),
    contractVersion: z.string().min(1),
    contextPacketHash: z.string().min(1)
  }),
  analysis: z.object({
    matchedExpectations: z.array(semanticJudgeFindingSchema).default([]),
    missedExpectations: z.array(semanticJudgeFindingSchema).default([]),
    violations: z.array(semanticJudgeFindingSchema).default([]),
    ambiguities: z.array(semanticJudgeFindingSchema).default([]),
    missingContextItems: z.array(z.string().min(1)).default([]),
    contextUsed: semanticEvalContextLevelSchema,
    needsMoreContext: z.boolean(),
    escalationUsed: z.boolean(),
    escalationReason: nullableTextSchema,
    contractErrors: z.array(semanticJudgeContractErrorSchema).default([])
  }),
  error: z
    .object({
      code: z.string().min(1),
      message: z.string().min(1)
    })
    .nullable()
    .default(null)
});

export type SemanticJudgeResult = z.infer<typeof semanticJudgeResultSchema>;

export const semanticJudgeRunMetadataSchema = z.object({
  provider: z.string().min(1),
  modelId: z.string().min(1),
  finishReason: nullableTextSchema,
  latencyMs: z.number().int().nonnegative().nullable().default(null),
  usage: runtimeUsageSchema.nullable().default(null),
  promptHash: z.string().min(1),
  systemPromptHash: z.string().min(1),
  userPromptHash: z.string().min(1)
});

export type SemanticJudgeRunMetadata = z.infer<typeof semanticJudgeRunMetadataSchema>;

export const semanticJudgeExecutionEnvelopeSchema = z.object({
  packet: semanticJudgeInputPacketSchema,
  result: semanticJudgeResultSchema,
  metadata: semanticJudgeRunMetadataSchema
});

export type SemanticJudgeExecutionEnvelope = z.infer<typeof semanticJudgeExecutionEnvelopeSchema>;
