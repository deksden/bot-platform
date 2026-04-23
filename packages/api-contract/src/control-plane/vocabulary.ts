import { z } from 'zod';
import { controlPlaneNonEmptyStringSchema } from './shared';

export const CONTROL_PLANE_CAPABILITY_FAMILIES = [
  'workspace.read',
  'membership.read',
  'membership.manage',
  'session.read',
  'session.revoke',
  'product_instance.read',
  'product_instance.manage',
  'channel.read',
  'channel.manage',
  'pipeline_binding.manage',
  'policy_assignment.read',
  'policy_assignment.manage',
  'execution_run.read',
  'trace_artifact.read'
] as const;

export const knownControlPlaneCapabilityFamilySchema = z.enum(
  CONTROL_PLANE_CAPABILITY_FAMILIES
);

export const controlPlaneCapabilityFamilySchema = z.union([
  knownControlPlaneCapabilityFamilySchema,
  controlPlaneNonEmptyStringSchema
]);

export type KnownControlPlaneCapabilityFamily = z.infer<
  typeof knownControlPlaneCapabilityFamilySchema
>;

export type ControlPlaneCapabilityFamily = z.infer<
  typeof controlPlaneCapabilityFamilySchema
>;

export const knownPrincipalKindSchema = z.enum(['operator', 'automation']);
export const principalKindSchema = z.union([
  knownPrincipalKindSchema,
  controlPlaneNonEmptyStringSchema
]);

export type KnownPrincipalKind = z.infer<typeof knownPrincipalKindSchema>;
export type PrincipalKind = z.infer<typeof principalKindSchema>;

export const sessionStatusSchema = z.enum([
  'active',
  'revoked',
  'expired',
  'replaced'
]);

export const membershipStatusSchema = z.enum(['active', 'revoked', 'disabled']);
export const workspaceStatusSchema = z.enum(['active', 'disabled']);
export const productInstanceStatusSchema = z.enum(['active', 'disabled']);

export const KNOWN_CHANNEL_KINDS = ['telegram', 'email', 'bitrix24_bot'] as const;

export const knownChannelKindSchema = z.enum(KNOWN_CHANNEL_KINDS);
export const channelKindSchema = z.union([
  knownChannelKindSchema,
  controlPlaneNonEmptyStringSchema
]);

export type KnownChannelKind = z.infer<typeof knownChannelKindSchema>;
export type ChannelKind = z.infer<typeof channelKindSchema>;

export const pipelineBindingStatusSchema = z.enum([
  'unbound',
  'bound',
  'degraded',
  'disabled',
  'invalid'
]);

export const replyThreadLinkingFidelitySchema = z.enum(['none', 'basic', 'full']);

export const executionRunStatusSchema = z.enum([
  'accepted',
  'running',
  'completed',
  'blocked',
  'failed'
]);

export const executionRunStepStatusSchema = z.enum([
  'pending',
  'running',
  'completed',
  'blocked',
  'failed',
  'skipped'
]);

export const KNOWN_TRACE_ARTIFACT_KINDS = [
  'rendered_prompt',
  'packed_context',
  'retrieved_evidence',
  'backend_request',
  'backend_response',
  'normalized_tool_input',
  'normalized_tool_output',
  'verification_bundle',
  'human_readable_report'
] as const;

export const knownTraceArtifactKindSchema = z.enum(KNOWN_TRACE_ARTIFACT_KINDS);
export const traceArtifactKindSchema = z.union([
  knownTraceArtifactKindSchema,
  controlPlaneNonEmptyStringSchema
]);

export type KnownTraceArtifactKind = z.infer<
  typeof knownTraceArtifactKindSchema
>;

export type TraceArtifactKind = z.infer<typeof traceArtifactKindSchema>;

export const traceArtifactRedactionStateSchema = z.enum([
  'none',
  'partial',
  'full',
  'blocked'
]);

export const CONTROL_PLANE_SURFACE_IDS = [
  'cp-memberships',
  'cp-sessions',
  'cp-product-instances',
  'cp-channels',
  'cp-runs',
  'cp-trace-artifacts'
] as const;

export const controlPlaneSurfaceIdSchema = z.enum(CONTROL_PLANE_SURFACE_IDS);

export type ControlPlaneSurfaceId = z.infer<typeof controlPlaneSurfaceIdSchema>;
