import { z } from 'zod';
import {
  controlPlaneChannelSchema,
  controlPlaneExecutionRunSchema,
  controlPlaneExecutionUsageSummarySchema,
  controlPlaneMembershipSchema,
  controlPlanePipelineBindingSchema,
  controlPlanePrincipalSchema,
  controlPlaneProductInstanceSchema,
  controlPlaneSessionSchema,
  controlPlaneTraceArtifactSchema,
  controlPlaneUserSchema,
  controlPlaneWorkspaceSchema
} from './models';
import {
  controlPlaneChannelRefSchema,
  controlPlaneNonEmptyStringSchema,
  controlPlaneNullableTextSchema,
  controlPlanePipelineIdSchema,
  controlPlaneTraceArtifactRefSchema,
  createControlPlaneItemEnvelopeSchema,
  createControlPlaneListEnvelopeSchema,
  createControlPlaneMutationEnvelopeSchema,
  controlPlaneJsonObjectSchema,
  controlPlaneMutationIssueSchema,
  controlPlaneTimestampSchema
} from './shared';
import {
  controlPlaneSurfaceIdSchema,
  executionRunStepStatusSchema,
  traceArtifactKindSchema,
  traceArtifactRedactionStateSchema
} from './vocabulary';

export const controlPlaneMembershipReadModelSchema = z.object({
  membership: controlPlaneMembershipSchema,
  user: controlPlaneUserSchema,
  workspace: controlPlaneWorkspaceSchema
});

export type ControlPlaneMembershipReadModel = z.infer<
  typeof controlPlaneMembershipReadModelSchema
>;

export const controlPlaneMembershipEnvelopeSchema =
  createControlPlaneItemEnvelopeSchema(controlPlaneMembershipReadModelSchema);
export const controlPlaneMembershipListEnvelopeSchema =
  createControlPlaneListEnvelopeSchema(controlPlaneMembershipReadModelSchema);
export const controlPlaneMembershipMutationEnvelopeSchema =
  createControlPlaneMutationEnvelopeSchema(controlPlaneMembershipReadModelSchema);

export type ControlPlaneMembershipEnvelope = z.infer<
  typeof controlPlaneMembershipEnvelopeSchema
>;

export type ControlPlaneMembershipListEnvelope = z.infer<
  typeof controlPlaneMembershipListEnvelopeSchema
>;

export type ControlPlaneMembershipMutationEnvelope = z.infer<
  typeof controlPlaneMembershipMutationEnvelopeSchema
>;

export const controlPlaneSessionReadModelSchema = z.object({
  session: controlPlaneSessionSchema,
  principal: controlPlanePrincipalSchema.nullable().default(null),
  workspace: controlPlaneWorkspaceSchema.nullable().default(null)
});

export type ControlPlaneSessionReadModel = z.infer<
  typeof controlPlaneSessionReadModelSchema
>;

export const controlPlaneSessionEnvelopeSchema = createControlPlaneItemEnvelopeSchema(
  controlPlaneSessionReadModelSchema
);
export const controlPlaneSessionListEnvelopeSchema =
  createControlPlaneListEnvelopeSchema(controlPlaneSessionReadModelSchema);
export const controlPlaneSessionRevokeEnvelopeSchema =
  createControlPlaneMutationEnvelopeSchema(controlPlaneSessionReadModelSchema);

export type ControlPlaneSessionEnvelope = z.infer<
  typeof controlPlaneSessionEnvelopeSchema
>;

export type ControlPlaneSessionListEnvelope = z.infer<
  typeof controlPlaneSessionListEnvelopeSchema
>;

export type ControlPlaneSessionRevokeEnvelope = z.infer<
  typeof controlPlaneSessionRevokeEnvelopeSchema
>;

export const controlPlaneProductInstanceReadModelSchema = z.object({
  productInstance: controlPlaneProductInstanceSchema,
  workspace: controlPlaneWorkspaceSchema
});

export type ControlPlaneProductInstanceReadModel = z.infer<
  typeof controlPlaneProductInstanceReadModelSchema
>;

export const controlPlaneProductInstanceEnvelopeSchema =
  createControlPlaneItemEnvelopeSchema(controlPlaneProductInstanceReadModelSchema);
export const controlPlaneProductInstanceListEnvelopeSchema =
  createControlPlaneListEnvelopeSchema(controlPlaneProductInstanceReadModelSchema);
export const controlPlaneProductInstanceMutationEnvelopeSchema =
  createControlPlaneMutationEnvelopeSchema(controlPlaneProductInstanceReadModelSchema);

export type ControlPlaneProductInstanceEnvelope = z.infer<
  typeof controlPlaneProductInstanceEnvelopeSchema
>;

export type ControlPlaneProductInstanceListEnvelope = z.infer<
  typeof controlPlaneProductInstanceListEnvelopeSchema
>;

export type ControlPlaneProductInstanceMutationEnvelope = z.infer<
  typeof controlPlaneProductInstanceMutationEnvelopeSchema
>;

export const controlPlanePipelineDefinitionReadbackSchema = z.object({
  pipelineId: controlPlanePipelineIdSchema,
  workflowFamily: controlPlaneNonEmptyStringSchema,
  label: controlPlaneNonEmptyStringSchema,
  supportedChannelKinds: z.array(controlPlaneNonEmptyStringSchema).default([]),
  requiredArgKeys: z.array(controlPlaneNonEmptyStringSchema).default([]),
  optionalArgKeys: z.array(controlPlaneNonEmptyStringSchema).default([]),
  defaultModelPolicyRef: controlPlaneNullableTextSchema,
  allowedResultIntents: z.array(controlPlaneNonEmptyStringSchema).default([])
});

export type ControlPlanePipelineDefinitionReadback = z.infer<
  typeof controlPlanePipelineDefinitionReadbackSchema
>;

export const controlPlaneChannelReadModelSchema = z.object({
  channel: controlPlaneChannelSchema,
  pipelineBinding: controlPlanePipelineBindingSchema.nullable().default(null),
  pipelineDefinition: controlPlanePipelineDefinitionReadbackSchema
    .nullable()
    .default(null),
  validationIssues: z.array(controlPlaneMutationIssueSchema).default([]),
  diagnosticsSummary: controlPlaneJsonObjectSchema
});

export type ControlPlaneChannelReadModel = z.infer<
  typeof controlPlaneChannelReadModelSchema
>;

export const controlPlaneChannelEnvelopeSchema = createControlPlaneItemEnvelopeSchema(
  controlPlaneChannelReadModelSchema
);
export const controlPlaneChannelListEnvelopeSchema =
  createControlPlaneListEnvelopeSchema(controlPlaneChannelReadModelSchema);
export const controlPlaneChannelBindingMutationEnvelopeSchema =
  createControlPlaneMutationEnvelopeSchema(controlPlaneChannelReadModelSchema);

export type ControlPlaneChannelEnvelope = z.infer<
  typeof controlPlaneChannelEnvelopeSchema
>;

export type ControlPlaneChannelListEnvelope = z.infer<
  typeof controlPlaneChannelListEnvelopeSchema
>;

export type ControlPlaneChannelBindingMutationEnvelope = z.infer<
  typeof controlPlaneChannelBindingMutationEnvelopeSchema
>;

export const controlPlaneExecutionRunStepSchema = z.object({
  stepRef: controlPlaneNonEmptyStringSchema,
  stepKind: controlPlaneNonEmptyStringSchema,
  status: executionRunStepStatusSchema,
  attemptCount: z.number().int().nonnegative(),
  retryCount: z.number().int().nonnegative().default(0),
  failoverCount: z.number().int().nonnegative().default(0),
  startedAt: controlPlaneTimestampSchema.nullable().default(null),
  completedAt: controlPlaneTimestampSchema.nullable().default(null),
  errorCode: controlPlaneNullableTextSchema,
  errorMessage: controlPlaneNullableTextSchema,
  metadata: controlPlaneJsonObjectSchema
});

export type ControlPlaneExecutionRunStep = z.infer<
  typeof controlPlaneExecutionRunStepSchema
>;

export const controlPlaneExecutionRunArtifactSummarySchema = z.object({
  traceArtifactRef: controlPlaneTraceArtifactRefSchema,
  artifactKind: traceArtifactKindSchema,
  redactionState: traceArtifactRedactionStateSchema,
  createdAt: controlPlaneTimestampSchema
});

export type ControlPlaneExecutionRunArtifactSummary = z.infer<
  typeof controlPlaneExecutionRunArtifactSummarySchema
>;

export const controlPlaneExecutionRunReadModelSchema = z.object({
  run: controlPlaneExecutionRunSchema,
  steps: z.array(controlPlaneExecutionRunStepSchema).default([]),
  usageSummary: controlPlaneExecutionUsageSummarySchema.nullable().default(null),
  linkedArtifacts: z.array(controlPlaneExecutionRunArtifactSummarySchema).default([])
});

export type ControlPlaneExecutionRunReadModel = z.infer<
  typeof controlPlaneExecutionRunReadModelSchema
>;

export const controlPlaneExecutionRunEnvelopeSchema =
  createControlPlaneItemEnvelopeSchema(controlPlaneExecutionRunReadModelSchema);
export const controlPlaneExecutionRunListEnvelopeSchema =
  createControlPlaneListEnvelopeSchema(controlPlaneExecutionRunReadModelSchema);

export type ControlPlaneExecutionRunEnvelope = z.infer<
  typeof controlPlaneExecutionRunEnvelopeSchema
>;

export type ControlPlaneExecutionRunListEnvelope = z.infer<
  typeof controlPlaneExecutionRunListEnvelopeSchema
>;

export const controlPlaneTraceArtifactReadModelSchema = z.object({
  artifact: controlPlaneTraceArtifactSchema,
  executionRun: controlPlaneExecutionRunSchema.nullable().default(null),
  channelRef: controlPlaneChannelRefSchema.nullable().default(null),
  payloadSummary: controlPlaneNullableTextSchema
});

export type ControlPlaneTraceArtifactReadModel = z.infer<
  typeof controlPlaneTraceArtifactReadModelSchema
>;

export const controlPlaneTraceArtifactEnvelopeSchema =
  createControlPlaneItemEnvelopeSchema(controlPlaneTraceArtifactReadModelSchema);
export const controlPlaneTraceArtifactListEnvelopeSchema =
  createControlPlaneListEnvelopeSchema(controlPlaneTraceArtifactReadModelSchema);

export type ControlPlaneTraceArtifactEnvelope = z.infer<
  typeof controlPlaneTraceArtifactEnvelopeSchema
>;

export type ControlPlaneTraceArtifactListEnvelope = z.infer<
  typeof controlPlaneTraceArtifactListEnvelopeSchema
>;

export const controlPlaneSurfaceListReadbackSchema = z.discriminatedUnion(
  'surfaceId',
  [
    z.object({
      surfaceId: z.literal('cp-memberships'),
      payload: controlPlaneMembershipListEnvelopeSchema
    }),
    z.object({
      surfaceId: z.literal('cp-sessions'),
      payload: controlPlaneSessionListEnvelopeSchema
    }),
    z.object({
      surfaceId: z.literal('cp-product-instances'),
      payload: controlPlaneProductInstanceListEnvelopeSchema
    }),
    z.object({
      surfaceId: z.literal('cp-channels'),
      payload: controlPlaneChannelListEnvelopeSchema
    }),
    z.object({
      surfaceId: z.literal('cp-runs'),
      payload: controlPlaneExecutionRunListEnvelopeSchema
    }),
    z.object({
      surfaceId: z.literal('cp-trace-artifacts'),
      payload: controlPlaneTraceArtifactListEnvelopeSchema
    })
  ]
);

export type ControlPlaneSurfaceListReadback = z.infer<
  typeof controlPlaneSurfaceListReadbackSchema
>;

export const controlPlaneSurfaceDetailReadbackSchema = z.object({
  surfaceId: controlPlaneSurfaceIdSchema,
  itemRef: controlPlaneNonEmptyStringSchema,
  payload: z.unknown()
});

export type ControlPlaneSurfaceDetailReadback = z.infer<
  typeof controlPlaneSurfaceDetailReadbackSchema
>;
