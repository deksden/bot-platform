import { z } from 'zod';
import {
  governedContentConnectedSourceSchema,
  governedContentImportReportSchema,
  governedContentImportRunSchema,
  governedContentProcessingArtifactSchema,
  governedContentSourceRevisionSchema
} from './models';
import {
  governedContentConnectedSourceRefSchema,
  governedContentImportRunRefSchema,
  governedContentProcessingArtifactRefSchema,
  createGovernedContentItemEnvelopeSchema,
  createGovernedContentListEnvelopeSchema
} from './shared';

export const governedContentSourceDetailReadModelSchema = z.object({
  source: governedContentConnectedSourceSchema,
  revisions: z.array(governedContentSourceRevisionSchema).default([]),
  latestImportRun: governedContentImportRunSchema.nullable().default(null),
  currentCandidateRevision: governedContentSourceRevisionSchema
    .nullable()
    .default(null),
  lastActivatedRevision: governedContentSourceRevisionSchema
    .nullable()
    .default(null)
});

export type GovernedContentSourceDetailReadModel = z.infer<
  typeof governedContentSourceDetailReadModelSchema
>;

export const governedContentImportDetailReadModelSchema = z.object({
  importRun: governedContentImportRunSchema,
  source: governedContentConnectedSourceSchema.nullable().default(null),
  sourceRevision: governedContentSourceRevisionSchema.nullable().default(null),
  report: governedContentImportReportSchema.nullable().default(null),
  processingArtifacts: z.array(governedContentProcessingArtifactSchema).default([])
});

export type GovernedContentImportDetailReadModel = z.infer<
  typeof governedContentImportDetailReadModelSchema
>;

export const governedContentSourcesEnvelopeSchema =
  createGovernedContentListEnvelopeSchema(governedContentConnectedSourceSchema);

export const governedContentSourceDetailEnvelopeSchema =
  createGovernedContentItemEnvelopeSchema(governedContentSourceDetailReadModelSchema);

export const governedContentImportsEnvelopeSchema =
  createGovernedContentListEnvelopeSchema(governedContentImportRunSchema);

export const governedContentImportDetailEnvelopeSchema =
  createGovernedContentItemEnvelopeSchema(governedContentImportDetailReadModelSchema);

export const governedContentArtifactsEnvelopeSchema =
  createGovernedContentListEnvelopeSchema(governedContentProcessingArtifactSchema);

export const governedContentArtifactEnvelopeSchema =
  createGovernedContentItemEnvelopeSchema(governedContentProcessingArtifactSchema);

export type GovernedContentSourcesEnvelope = z.infer<
  typeof governedContentSourcesEnvelopeSchema
>;

export type GovernedContentSourceDetailEnvelope = z.infer<
  typeof governedContentSourceDetailEnvelopeSchema
>;

export type GovernedContentImportsEnvelope = z.infer<
  typeof governedContentImportsEnvelopeSchema
>;

export type GovernedContentImportDetailEnvelope = z.infer<
  typeof governedContentImportDetailEnvelopeSchema
>;

export type GovernedContentArtifactsEnvelope = z.infer<
  typeof governedContentArtifactsEnvelopeSchema
>;

export type GovernedContentArtifactEnvelope = z.infer<
  typeof governedContentArtifactEnvelopeSchema
>;

const governedContentSourcesSurfaceReadbackSchemaInternal = z.object({
  surfaceId: z.literal('gc-sources'),
  payload: governedContentSourcesEnvelopeSchema
});

const governedContentSourceDetailSurfaceReadbackSchemaInternal = z.object({
  surfaceId: z.literal('gc-source-detail'),
  itemRef: governedContentConnectedSourceRefSchema,
  payload: governedContentSourceDetailEnvelopeSchema
});

const governedContentImportsSurfaceReadbackSchemaInternal = z.object({
  surfaceId: z.literal('gc-imports'),
  payload: governedContentImportsEnvelopeSchema
});

const governedContentImportDetailSurfaceReadbackSchemaInternal = z.object({
  surfaceId: z.literal('gc-import-detail'),
  itemRef: governedContentImportRunRefSchema,
  payload: governedContentImportDetailEnvelopeSchema
});

const governedContentArtifactsSurfaceReadbackSchemaInternal = z.object({
  surfaceId: z.literal('gc-artifacts'),
  payload: governedContentArtifactsEnvelopeSchema
});

const governedContentArtifactDetailSurfaceReadbackSchemaInternal = z.object({
  surfaceId: z.literal('gc-artifacts'),
  itemRef: governedContentProcessingArtifactRefSchema,
  payload: governedContentArtifactEnvelopeSchema
});

export const governedContentSurfaceListReadbackSchema = z.discriminatedUnion(
  'surfaceId',
  [
    governedContentSourcesSurfaceReadbackSchemaInternal,
    governedContentImportsSurfaceReadbackSchemaInternal,
    governedContentArtifactsSurfaceReadbackSchemaInternal
  ]
);

export type GovernedContentSurfaceListReadback = z.infer<
  typeof governedContentSurfaceListReadbackSchema
>;

export const governedContentSurfaceDetailReadbackSchema =
  z.discriminatedUnion('surfaceId', [
    governedContentSourceDetailSurfaceReadbackSchemaInternal,
    governedContentImportDetailSurfaceReadbackSchemaInternal,
    governedContentArtifactDetailSurfaceReadbackSchemaInternal
  ]);

export type GovernedContentSurfaceDetailReadback = z.infer<
  typeof governedContentSurfaceDetailReadbackSchema
>;

export const governedContentSurfaceReadbackSchema = z.union([
  governedContentSourcesSurfaceReadbackSchemaInternal,
  governedContentSourceDetailSurfaceReadbackSchemaInternal,
  governedContentImportsSurfaceReadbackSchemaInternal,
  governedContentImportDetailSurfaceReadbackSchemaInternal,
  governedContentArtifactsSurfaceReadbackSchemaInternal,
  governedContentArtifactDetailSurfaceReadbackSchemaInternal
]);

export type GovernedContentSurfaceReadback = z.infer<
  typeof governedContentSurfaceReadbackSchema
>;
