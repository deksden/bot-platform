import { z } from 'zod';
import {
  controlPlaneChannelRefSchema,
  controlPlaneExecutionRunRefSchema,
  controlPlaneJsonObjectSchema,
  controlPlaneNonEmptyStringSchema,
  controlPlaneNullableTextSchema,
  controlPlaneProductInstanceRefSchema,
  controlPlaneReadEnvelopeMetaSchema,
  controlPlaneTimestampSchema,
  controlPlaneTraceArtifactRefSchema,
  controlPlaneWorkspaceRefSchema
} from './shared';
import {
  controlPlaneObservabilityEventLevelSchema,
  controlPlaneObservabilityEventNameSchema
} from './vocabulary';

export const controlPlaneObservabilityEventSchema = z
  .object({
    level: controlPlaneObservabilityEventLevelSchema,
    event: controlPlaneObservabilityEventNameSchema,
    service: controlPlaneNonEmptyStringSchema,
    requestId: controlPlaneNullableTextSchema,
    correlationId: controlPlaneNullableTextSchema,
    operationId: controlPlaneNullableTextSchema,
    workspaceRef: controlPlaneWorkspaceRefSchema.nullable().default(null),
    productInstanceRef: controlPlaneProductInstanceRefSchema
      .nullable()
      .default(null),
    channelRef: controlPlaneChannelRefSchema.nullable().default(null),
    actorRef: controlPlaneNullableTextSchema,
    executionRunRef: controlPlaneExecutionRunRefSchema.nullable().default(null),
    traceArtifactRef: controlPlaneTraceArtifactRefSchema.nullable().default(null),
    env: controlPlaneNullableTextSchema,
    release: controlPlaneNullableTextSchema,
    route: controlPlaneNullableTextSchema,
    method: controlPlaneNullableTextSchema,
    details: controlPlaneJsonObjectSchema,
    occurredAt: controlPlaneTimestampSchema
  })
  .superRefine((value, ctx) => {
    if (
      value.event === 'diagnostics_read' &&
      value.executionRunRef === null &&
      value.channelRef === null &&
      value.workspaceRef === null &&
      value.productInstanceRef === null
    ) {
      ctx.addIssue({
        code: 'custom',
        message:
          'diagnostics_read events must include at least one target reference.'
      });
    }

    if (
      value.event === 'trace_artifact_read' &&
      value.traceArtifactRef === null
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'trace_artifact_read events must include traceArtifactRef.'
      });
    }

    if (value.event === 'compat_fallback_used') {
      const fallbackKind = value.details.fallbackKind;

      if (
        typeof fallbackKind !== 'string' ||
        fallbackKind.trim().length === 0
      ) {
        ctx.addIssue({
          code: 'custom',
          message:
            'compat_fallback_used events must include details.fallbackKind.'
        });
      }
    }
  });

export type ControlPlaneObservabilityEvent = z.infer<
  typeof controlPlaneObservabilityEventSchema
>;

export const controlPlaneObservabilityEventBatchSchema = z.object({
  items: z.array(controlPlaneObservabilityEventSchema).default([]),
  meta: controlPlaneReadEnvelopeMetaSchema
});

export type ControlPlaneObservabilityEventBatch = z.infer<
  typeof controlPlaneObservabilityEventBatchSchema
>;
