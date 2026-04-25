import { z } from 'zod';
import {
  governedContentConnectedSourceRefSchema,
  governedContentImportRunRefSchema,
  governedContentJsonObjectSchema,
  governedContentNonEmptyStringSchema,
  governedContentNullableTextSchema,
  governedContentProcessingArtifactRefSchema,
  governedContentSourceRevisionRefSchema,
  governedContentTimestampSchema,
  governedContentWorkflowRunRefSchema
} from './shared';
import {
  importReportNextActionSchema,
  importRunOperationKindSchema,
  importRunStatusSchema,
  processingArtifactKindSchema,
  processingItemClassificationSchema,
  sourceIngressKindSchema,
  sourceRevisionLineageKindSchema
} from './vocabulary';

export const governedContentConnectedSourceIngressSchema = z.object({
  ingressKind: sourceIngressKindSchema,
  locator: governedContentNonEmptyStringSchema,
  displayName: governedContentNullableTextSchema
});

export type GovernedContentConnectedSourceIngress = z.infer<
  typeof governedContentConnectedSourceIngressSchema
>;

export const governedContentConnectedSourceSchema = z.object({
  connectedSourceRef: governedContentConnectedSourceRefSchema,
  sourceKey: governedContentNonEmptyStringSchema,
  ingress: governedContentConnectedSourceIngressSchema,
  createdAt: governedContentTimestampSchema,
  updatedAt: governedContentTimestampSchema,
  latestImportRunRef: governedContentImportRunRefSchema.nullable().default(null),
  currentCandidateRevisionRef: governedContentSourceRevisionRefSchema
    .nullable()
    .default(null),
  lastActivatedRevisionRef: governedContentSourceRevisionRefSchema
    .nullable()
    .default(null),
  metadata: governedContentJsonObjectSchema
});

export type GovernedContentConnectedSource = z.infer<
  typeof governedContentConnectedSourceSchema
>;

export const governedContentSourceRevisionSchema = z.object({
  sourceRevisionRef: governedContentSourceRevisionRefSchema,
  connectedSourceRef: governedContentConnectedSourceRefSchema,
  lineageKind: sourceRevisionLineageKindSchema,
  revisionFingerprint: governedContentNonEmptyStringSchema,
  candidateKey: governedContentNonEmptyStringSchema,
  env: governedContentNullableTextSchema,
  importRunRef: governedContentImportRunRefSchema.nullable().default(null),
  processingArtifactRef: governedContentProcessingArtifactRefSchema
    .nullable()
    .default(null),
  createdAt: governedContentTimestampSchema,
  updatedAt: governedContentTimestampSchema,
  metadata: governedContentJsonObjectSchema
});

export type GovernedContentSourceRevision = z.infer<
  typeof governedContentSourceRevisionSchema
>;

export const governedContentImportRunSchema = z.object({
  importRunRef: governedContentImportRunRefSchema,
  connectedSourceRef: governedContentConnectedSourceRefSchema,
  status: importRunStatusSchema,
  operationKind: importRunOperationKindSchema,
  idempotencyKey: governedContentNonEmptyStringSchema,
  env: governedContentNullableTextSchema,
  sourceRevisionRef: governedContentSourceRevisionRefSchema.nullable().default(null),
  processingArtifactRefs: z
    .array(governedContentProcessingArtifactRefSchema)
    .default([]),
  workflowRunRef: governedContentWorkflowRunRefSchema.nullable().default(null),
  createdAt: governedContentTimestampSchema,
  updatedAt: governedContentTimestampSchema,
  completedAt: governedContentTimestampSchema.nullable().default(null),
  failureReason: governedContentNullableTextSchema,
  metadata: governedContentJsonObjectSchema
});

export type GovernedContentImportRun = z.infer<
  typeof governedContentImportRunSchema
>;

export const governedContentProcessingWarningSchema = z.object({
  code: governedContentNonEmptyStringSchema,
  message: governedContentNonEmptyStringSchema,
  sourcePath: governedContentNullableTextSchema
});

export type GovernedContentProcessingWarning = z.infer<
  typeof governedContentProcessingWarningSchema
>;

export const governedContentUnsupportedItemRecordSchema = z.object({
  itemRef: governedContentNonEmptyStringSchema,
  reason: governedContentNonEmptyStringSchema,
  sourcePath: governedContentNullableTextSchema
});

export type GovernedContentUnsupportedItemRecord = z.infer<
  typeof governedContentUnsupportedItemRecordSchema
>;

export const governedContentProcessingArtifactSchema = z.object({
  processingArtifactRef: governedContentProcessingArtifactRefSchema,
  importRunRef: governedContentImportRunRefSchema,
  connectedSourceRef: governedContentConnectedSourceRefSchema,
  sourceRevisionRef: governedContentSourceRevisionRefSchema.nullable().default(null),
  artifactKind: processingArtifactKindSchema,
  classification: processingItemClassificationSchema,
  fingerprint: governedContentNonEmptyStringSchema,
  payloadRef: governedContentNullableTextSchema,
  warnings: z.array(governedContentProcessingWarningSchema).default([]),
  unsupportedItems: z
    .array(governedContentUnsupportedItemRecordSchema)
    .default([]),
  createdAt: governedContentTimestampSchema,
  metadata: governedContentJsonObjectSchema
});

export type GovernedContentProcessingArtifact = z.infer<
  typeof governedContentProcessingArtifactSchema
>;

export const governedContentImportReportSummarySchema = z.object({
  totalItems: z.number().int().nonnegative(),
  supportedItems: z.number().int().nonnegative(),
  degradedItems: z.number().int().nonnegative(),
  unsupportedItems: z.number().int().nonnegative()
});

export type GovernedContentImportReportSummary = z.infer<
  typeof governedContentImportReportSummarySchema
>;

export const governedContentImportReportSchema = z.object({
  importRunRef: governedContentImportRunRefSchema,
  connectedSourceRef: governedContentConnectedSourceRefSchema,
  sourceRevisionRef: governedContentSourceRevisionRefSchema.nullable().default(null),
  status: importRunStatusSchema,
  nextAction: importReportNextActionSchema,
  summary: governedContentImportReportSummarySchema,
  processingArtifactRefs: z
    .array(governedContentProcessingArtifactRefSchema)
    .default([]),
  warnings: z.array(governedContentProcessingWarningSchema).default([]),
  unsupportedItems: z
    .array(governedContentUnsupportedItemRecordSchema)
    .default([]),
  generatedAt: governedContentTimestampSchema,
  metadata: governedContentJsonObjectSchema
});

export type GovernedContentImportReport = z.infer<
  typeof governedContentImportReportSchema
>;
