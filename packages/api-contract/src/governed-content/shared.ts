import { z } from 'zod';

export const governedContentNonEmptyStringSchema = z.string().min(1);
export const governedContentTimestampSchema = governedContentNonEmptyStringSchema;

export const governedContentNullableTextSchema = governedContentNonEmptyStringSchema
  .nullable()
  .default(null);

export const governedContentJsonObjectSchema = z
  .record(z.string(), z.unknown())
  .default({});

export const governedContentConnectedSourceRefSchema =
  governedContentNonEmptyStringSchema;
export const governedContentSourceRevisionRefSchema =
  governedContentNonEmptyStringSchema;
export const governedContentImportRunRefSchema = governedContentNonEmptyStringSchema;
export const governedContentProcessingArtifactRefSchema =
  governedContentNonEmptyStringSchema;
export const governedContentWorkflowRunRefSchema =
  governedContentNonEmptyStringSchema;

export const governedContentReadEnvelopeMetaSchema = z.object({
  requestId: governedContentNonEmptyStringSchema.nullable().default(null),
  correlationId: governedContentNonEmptyStringSchema.nullable().default(null),
  generatedAt: governedContentTimestampSchema
});

export type GovernedContentReadEnvelopeMeta = z.infer<
  typeof governedContentReadEnvelopeMetaSchema
>;

export const governedContentListPageSchema = z.object({
  limit: z.number().int().positive(),
  nextCursor: governedContentNonEmptyStringSchema.nullable().default(null),
  totalCount: z.number().int().nonnegative().nullable().default(null)
});

export type GovernedContentListPage = z.infer<
  typeof governedContentListPageSchema
>;

export function createGovernedContentItemEnvelopeSchema<
  TItemSchema extends z.ZodTypeAny
>(itemSchema: TItemSchema) {
  return z.object({
    item: itemSchema,
    meta: governedContentReadEnvelopeMetaSchema
  });
}

export function createGovernedContentListEnvelopeSchema<
  TItemSchema extends z.ZodTypeAny
>(itemSchema: TItemSchema) {
  return z.object({
    items: z.array(itemSchema).default([]),
    page: governedContentListPageSchema,
    meta: governedContentReadEnvelopeMetaSchema
  });
}
