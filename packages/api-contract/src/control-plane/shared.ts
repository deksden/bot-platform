import { z } from 'zod';

export const controlPlaneNonEmptyStringSchema = z.string().min(1);
export const controlPlaneTimestampSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneVersionTokenSchema = controlPlaneNonEmptyStringSchema;

export const controlPlaneNullableTextSchema = controlPlaneNonEmptyStringSchema
  .nullable()
  .default(null);

export const controlPlaneJsonObjectSchema = z
  .record(z.string(), z.unknown())
  .default({});

export const controlPlaneUserRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlanePrincipalRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneSessionRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneMembershipRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneWorkspaceRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneProductInstanceRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneChannelRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlanePipelineBindingRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneExecutionRunRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneTraceArtifactRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlanePolicyAssignmentRefSchema = controlPlaneNonEmptyStringSchema;
export const controlPlanePipelineIdSchema = controlPlaneNonEmptyStringSchema;
export const controlPlaneOverlayRefMapSchema = z
  .record(z.string(), controlPlaneNonEmptyStringSchema)
  .default({});

export const controlPlaneReadEnvelopeMetaSchema = z.object({
  requestId: controlPlaneNonEmptyStringSchema.nullable().default(null),
  correlationId: controlPlaneNonEmptyStringSchema.nullable().default(null),
  generatedAt: controlPlaneTimestampSchema
});

export type ControlPlaneReadEnvelopeMeta = z.infer<
  typeof controlPlaneReadEnvelopeMetaSchema
>;

export const controlPlaneListPageSchema = z.object({
  limit: z.number().int().positive(),
  nextCursor: controlPlaneNonEmptyStringSchema.nullable().default(null),
  totalCount: z.number().int().nonnegative().nullable().default(null)
});

export type ControlPlaneListPage = z.infer<typeof controlPlaneListPageSchema>;

export function createControlPlaneItemEnvelopeSchema<
  TItemSchema extends z.ZodTypeAny
>(itemSchema: TItemSchema) {
  return z.object({
    item: itemSchema,
    meta: controlPlaneReadEnvelopeMetaSchema
  });
}

export function createControlPlaneListEnvelopeSchema<
  TItemSchema extends z.ZodTypeAny
>(itemSchema: TItemSchema) {
  return z.object({
    items: z.array(itemSchema).default([]),
    page: controlPlaneListPageSchema,
    meta: controlPlaneReadEnvelopeMetaSchema
  });
}

export const controlPlaneMutationIssueSchema = z.object({
  path: controlPlaneNonEmptyStringSchema.nullable().default(null),
  code: controlPlaneNonEmptyStringSchema,
  message: controlPlaneNonEmptyStringSchema,
  details: controlPlaneJsonObjectSchema
});

export type ControlPlaneMutationIssue = z.infer<
  typeof controlPlaneMutationIssueSchema
>;

export const controlPlaneValidationErrorSchema = z.object({
  kind: z.literal('validation'),
  code: z.enum(['invalid_input', 'invalid_relation']),
  message: controlPlaneNonEmptyStringSchema,
  issues: z.array(controlPlaneMutationIssueSchema).default([]),
  details: controlPlaneJsonObjectSchema
});

export type ControlPlaneValidationError = z.infer<
  typeof controlPlaneValidationErrorSchema
>;

export const controlPlaneConflictErrorSchema = z.object({
  kind: z.literal('conflict'),
  code: z.enum(['stale_write', 'concurrent_mutation', 'duplicate_relation']),
  message: controlPlaneNonEmptyStringSchema,
  expectedVersionToken: controlPlaneVersionTokenSchema.nullable().default(null),
  actualVersionToken: controlPlaneVersionTokenSchema.nullable().default(null),
  details: controlPlaneJsonObjectSchema
});

export type ControlPlaneConflictError = z.infer<
  typeof controlPlaneConflictErrorSchema
>;

export const controlPlaneMutationErrorEnvelopeSchema = z.union([
  controlPlaneValidationErrorSchema,
  controlPlaneConflictErrorSchema
]);

export type ControlPlaneMutationErrorEnvelope = z.infer<
  typeof controlPlaneMutationErrorEnvelopeSchema
>;

export function createControlPlaneMutationEnvelopeSchema<
  TValueSchema extends z.ZodTypeAny
>(valueSchema: TValueSchema) {
  return z.discriminatedUnion('ok', [
    z.object({
      ok: z.literal(true),
      value: valueSchema
    }),
    z.object({
      ok: z.literal(false),
      error: controlPlaneMutationErrorEnvelopeSchema
    })
  ]);
}

export type ControlPlaneMutationEnvelope<TValue> =
  | {
      ok: true;
      value: TValue;
    }
  | {
      ok: false;
      error: ControlPlaneMutationErrorEnvelope;
    };
