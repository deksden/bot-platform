import { z } from 'zod';
import { governedContentNonEmptyStringSchema } from './shared';

export const sourceIngressKindSchema = z.enum(['file', 'folder', 'archive']);
export type SourceIngressKind = z.infer<typeof sourceIngressKindSchema>;

export const sourceRevisionLineageKindSchema = z.enum(['candidate']);
export type SourceRevisionLineageKind = z.infer<
  typeof sourceRevisionLineageKindSchema
>;

export const importRunStatusSchema = z.enum([
  'accepted',
  'processing',
  'bundle_ready',
  'importing',
  'review_required',
  'ready_for_activation',
  'activated',
  'failed',
  'cancelled'
]);

export type ImportRunStatus = z.infer<typeof importRunStatusSchema>;

export const KNOWN_IMPORT_RUN_OPERATION_KINDS = ['import', 'reimport'] as const;

export const knownImportRunOperationKindSchema = z.enum(
  KNOWN_IMPORT_RUN_OPERATION_KINDS
);

export const importRunOperationKindSchema = z.union([
  knownImportRunOperationKindSchema,
  governedContentNonEmptyStringSchema
]);

export type KnownImportRunOperationKind = z.infer<
  typeof knownImportRunOperationKindSchema
>;

export type ImportRunOperationKind = z.infer<
  typeof importRunOperationKindSchema
>;

export const processingItemClassificationSchema = z.enum([
  'supported',
  'degraded',
  'unsupported'
]);

export type ProcessingItemClassification = z.infer<
  typeof processingItemClassificationSchema
>;

export const processingArtifactKindSchema = z.enum([
  'bundle_manifest',
  'normalized_markdown',
  'derived_asset',
  'structure_tree',
  'fingerprint_manifest',
  'warning_report',
  'unsupported_items_report'
]);

export type ProcessingArtifactKind = z.infer<
  typeof processingArtifactKindSchema
>;

export const importReportNextActionSchema = z.enum([
  'none',
  'track',
  'review',
  'activate',
  'retry'
]);

export type ImportReportNextAction = z.infer<
  typeof importReportNextActionSchema
>;

export const GOVERNED_CONTENT_SURFACE_IDS = [
  'gc-sources',
  'gc-source-detail',
  'gc-imports',
  'gc-import-detail',
  'gc-artifacts'
] as const;

export const governedContentSurfaceIdSchema = z.enum(
  GOVERNED_CONTENT_SURFACE_IDS
);

export type GovernedContentSurfaceId = z.infer<
  typeof governedContentSurfaceIdSchema
>;
