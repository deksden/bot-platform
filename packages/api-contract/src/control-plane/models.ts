import { z } from 'zod';
import {
  controlPlaneChannelRefSchema,
  controlPlaneExecutionRunRefSchema,
  controlPlaneJsonObjectSchema,
  controlPlaneMembershipRefSchema,
  controlPlaneNonEmptyStringSchema,
  controlPlaneNullableTextSchema,
  controlPlaneOverlayRefMapSchema,
  controlPlanePipelineBindingRefSchema,
  controlPlanePipelineIdSchema,
  controlPlanePolicyAssignmentRefSchema,
  controlPlanePrincipalRefSchema,
  controlPlaneProductInstanceRefSchema,
  controlPlaneSessionRefSchema,
  controlPlaneTimestampSchema,
  controlPlaneTraceArtifactRefSchema,
  controlPlaneUserRefSchema,
  controlPlaneVersionTokenSchema,
  controlPlaneWorkspaceRefSchema
} from './shared';
import {
  channelKindSchema,
  controlPlaneCapabilityFamilySchema,
  executionRunStatusSchema,
  pipelineBindingStatusSchema,
  principalKindSchema,
  productInstanceStatusSchema,
  replyThreadLinkingFidelitySchema,
  sessionStatusSchema,
  traceArtifactKindSchema,
  traceArtifactRedactionStateSchema,
  workspaceStatusSchema,
  membershipStatusSchema
} from './vocabulary';

export const controlPlaneUserSchema = z.object({
  userRef: controlPlaneUserRefSchema,
  email: controlPlaneNonEmptyStringSchema.nullable().default(null),
  displayName: controlPlaneNullableTextSchema,
  createdAt: controlPlaneTimestampSchema,
  updatedAt: controlPlaneTimestampSchema
});

export type ControlPlaneUser = z.infer<typeof controlPlaneUserSchema>;

export const controlPlanePrincipalSchema = z.object({
  principalRef: controlPlanePrincipalRefSchema,
  principalKind: principalKindSchema,
  userRef: controlPlaneUserRefSchema.nullable().default(null),
  displayName: controlPlaneNullableTextSchema
});

export type ControlPlanePrincipal = z.infer<typeof controlPlanePrincipalSchema>;

export const controlPlaneSessionSchema = z.object({
  sessionRef: controlPlaneSessionRefSchema,
  principalRef: controlPlanePrincipalRefSchema,
  workspaceRef: controlPlaneWorkspaceRefSchema.nullable().default(null),
  status: sessionStatusSchema,
  issuedAt: controlPlaneTimestampSchema,
  expiresAt: controlPlaneTimestampSchema.nullable().default(null),
  revokedAt: controlPlaneTimestampSchema.nullable().default(null),
  replacedBySessionRef: controlPlaneSessionRefSchema.nullable().default(null)
});

export type ControlPlaneSession = z.infer<typeof controlPlaneSessionSchema>;

export const controlPlaneMembershipSchema = z.object({
  membershipRef: controlPlaneMembershipRefSchema,
  workspaceRef: controlPlaneWorkspaceRefSchema,
  userRef: controlPlaneUserRefSchema,
  status: membershipStatusSchema,
  capabilityFamilies: z.array(controlPlaneCapabilityFamilySchema).default([]),
  roleOverlayRef: controlPlaneNullableTextSchema,
  createdAt: controlPlaneTimestampSchema,
  updatedAt: controlPlaneTimestampSchema
});

export type ControlPlaneMembership = z.infer<typeof controlPlaneMembershipSchema>;

export const controlPlaneWorkspaceSchema = z.object({
  workspaceRef: controlPlaneWorkspaceRefSchema,
  status: workspaceStatusSchema,
  displayName: controlPlaneNullableTextSchema,
  createdAt: controlPlaneTimestampSchema,
  updatedAt: controlPlaneTimestampSchema
});

export type ControlPlaneWorkspace = z.infer<typeof controlPlaneWorkspaceSchema>;

export const controlPlaneProductInstanceSchema = z.object({
  productInstanceRef: controlPlaneProductInstanceRefSchema,
  workspaceRef: controlPlaneWorkspaceRefSchema,
  productKey: controlPlaneNonEmptyStringSchema,
  status: productInstanceStatusSchema,
  displayName: controlPlaneNullableTextSchema,
  createdAt: controlPlaneTimestampSchema,
  updatedAt: controlPlaneTimestampSchema
});

export type ControlPlaneProductInstance = z.infer<
  typeof controlPlaneProductInstanceSchema
>;

export const controlPlaneChannelTransportConfigSummarySchema = z.object({
  transportKind: controlPlaneNonEmptyStringSchema,
  summary: controlPlaneJsonObjectSchema
});

export type ControlPlaneChannelTransportConfigSummary = z.infer<
  typeof controlPlaneChannelTransportConfigSummarySchema
>;

export const controlPlaneChannelCapabilityMatrixSchema = z.object({
  supportsSynchronousDelivery: z.boolean(),
  supportsAsynchronousDelivery: z.boolean(),
  supportsInbound: z.boolean(),
  supportsOutbound: z.boolean(),
  replyThreadLinkingFidelity: replyThreadLinkingFidelitySchema,
  supportsAttachments: z.boolean(),
  supportsOperatorCommands: z.boolean(),
  supportsTransportDiagnostics: z.boolean()
});

export type ControlPlaneChannelCapabilityMatrix = z.infer<
  typeof controlPlaneChannelCapabilityMatrixSchema
>;

export const controlPlanePipelineBindingSchema = z.object({
  pipelineBindingRef: controlPlanePipelineBindingRefSchema,
  channelRef: controlPlaneChannelRefSchema,
  channelKind: channelKindSchema,
  pipelineId: controlPlanePipelineIdSchema,
  bindingStatus: pipelineBindingStatusSchema,
  pipelineArgs: controlPlaneJsonObjectSchema,
  policyAssignmentRef: controlPlanePolicyAssignmentRefSchema.nullable().default(null),
  effectiveArgSchemaRef: controlPlaneNullableTextSchema,
  versionToken: controlPlaneVersionTokenSchema.nullable().default(null),
  validatedAt: controlPlaneTimestampSchema.nullable().default(null),
  updatedAt: controlPlaneTimestampSchema
});

export type ControlPlanePipelineBinding = z.infer<
  typeof controlPlanePipelineBindingSchema
>;

export const controlPlaneChannelSchema = z.object({
  channelRef: controlPlaneChannelRefSchema,
  workspaceRef: controlPlaneWorkspaceRefSchema,
  productInstanceRef: controlPlaneProductInstanceRefSchema,
  channelKind: channelKindSchema,
  entryPipelineId: controlPlanePipelineIdSchema,
  bindingStatus: pipelineBindingStatusSchema,
  transportConfigSummary: controlPlaneChannelTransportConfigSummarySchema,
  capabilityMatrix: controlPlaneChannelCapabilityMatrixSchema,
  policyAssignmentRef: controlPlanePolicyAssignmentRefSchema.nullable().default(null),
  overlayRefs: controlPlaneOverlayRefMapSchema,
  pipelineBinding: controlPlanePipelineBindingSchema.nullable().default(null),
  createdAt: controlPlaneTimestampSchema,
  updatedAt: controlPlaneTimestampSchema
});

export type ControlPlaneChannel = z.infer<typeof controlPlaneChannelSchema>;

export const controlPlaneExecutionUsageSummarySchema = z.object({
  inputTokens: z.number().int().nonnegative().nullable().default(null),
  outputTokens: z.number().int().nonnegative().nullable().default(null),
  cacheReadTokens: z.number().int().nonnegative().nullable().default(null),
  cacheWriteTokens: z.number().int().nonnegative().nullable().default(null),
  totalTokens: z.number().int().nonnegative().nullable().default(null)
});

export type ControlPlaneExecutionUsageSummary = z.infer<
  typeof controlPlaneExecutionUsageSummarySchema
>;

export const controlPlaneExecutionRunBindingSnapshotSchema = z.object({
  channelRef: controlPlaneChannelRefSchema,
  pipelineBindingRef: controlPlanePipelineBindingRefSchema.nullable().default(null),
  pipelineId: controlPlanePipelineIdSchema,
  bindingStatus: pipelineBindingStatusSchema,
  pipelineArgs: controlPlaneJsonObjectSchema,
  policyAssignmentRef: controlPlanePolicyAssignmentRefSchema.nullable().default(null),
  capturedAt: controlPlaneTimestampSchema
});

export type ControlPlaneExecutionRunBindingSnapshot = z.infer<
  typeof controlPlaneExecutionRunBindingSnapshotSchema
>;

export const controlPlaneExecutionRunSchema = z.object({
  executionRunRef: controlPlaneExecutionRunRefSchema,
  workspaceRef: controlPlaneWorkspaceRefSchema,
  productInstanceRef: controlPlaneProductInstanceRefSchema,
  channelRef: controlPlaneChannelRefSchema.nullable().default(null),
  pipelineId: controlPlanePipelineIdSchema.nullable().default(null),
  workflowFamily: controlPlaneNonEmptyStringSchema,
  status: executionRunStatusSchema,
  acceptedBindingSnapshot: controlPlaneExecutionRunBindingSnapshotSchema
    .nullable()
    .default(null),
  attemptCount: z.number().int().nonnegative(),
  retryCount: z.number().int().nonnegative(),
  failoverCount: z.number().int().nonnegative(),
  usageSummary: controlPlaneExecutionUsageSummarySchema.optional(),
  traceArtifactRefs: z.array(controlPlaneTraceArtifactRefSchema).default([]),
  startedAt: controlPlaneTimestampSchema,
  completedAt: controlPlaneTimestampSchema.nullable().default(null)
});

export type ControlPlaneExecutionRun = z.infer<typeof controlPlaneExecutionRunSchema>;

export const controlPlaneTraceArtifactSchema = z.object({
  traceArtifactRef: controlPlaneTraceArtifactRefSchema,
  executionRunRef: controlPlaneExecutionRunRefSchema,
  artifactKind: traceArtifactKindSchema,
  redactionState: traceArtifactRedactionStateSchema,
  redactionReason: controlPlaneNullableTextSchema,
  storageRef: controlPlaneNullableTextSchema,
  inlinePayload: controlPlaneJsonObjectSchema.nullable().default(null),
  createdAt: controlPlaneTimestampSchema
});

export type ControlPlaneTraceArtifact = z.infer<
  typeof controlPlaneTraceArtifactSchema
>;
