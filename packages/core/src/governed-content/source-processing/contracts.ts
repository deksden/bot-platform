import type {
  ConnectedSourceRef,
  ImportRunRef,
  ProcessingWarning,
  SourceRevisionRef,
  UnsupportedItemRecord
} from '../vocabulary/objects';
import type {
  ProcessingItemClassification,
  SourceIngressKind
} from '../vocabulary/statuses';

export const SOURCE_PROCESSING_BUNDLE_SCHEMA_VERSION = '1.0.0' as const;

export type SourceProcessingBundleSchemaVersion =
  typeof SOURCE_PROCESSING_BUNDLE_SCHEMA_VERSION;

export interface SourceProcessingClassificationSummary {
  totalItems: number;
  supportedItems: number;
  degradedItems: number;
  unsupportedItems: number;
}

export type SourceProcessingStructureNodeKind = 'root' | 'folder' | 'file';

export interface SourceProcessingStructureNode {
  nodeRef: string;
  nodeKind: SourceProcessingStructureNodeKind;
  name: string;
  relativePath: string;
  parentNodeRef?: string | null;
  childNodeRefs: string[];
  itemRef?: string | null;
}

export interface SourceProcessingDerivedAsset {
  assetRef: string;
  itemRef: string;
  assetKind: 'image' | 'attachment' | (string & {});
  relativePath: string;
  fileName?: string | null;
  mediaType?: string | null;
  byteSize?: number | null;
  fingerprint?: string | null;
  payloadRef?: string | null;
  metadata?: Record<string, unknown>;
}

export interface SourceProcessingDegradationMarker {
  code: string;
  message: string;
}

export interface SourceProcessingBundleItemProvenance {
  locator: string;
  sourcePath: string;
  relativePath: string;
  mediaType?: string | null;
  byteSize?: number | null;
  parserRef?: string | null;
}

export interface SourceProcessingBundleItem {
  itemRef: string;
  classification: ProcessingItemClassification;
  structureNodeRef: string;
  provenance: SourceProcessingBundleItemProvenance;
  sourceFingerprint: string;
  normalizedMarkdown?: string | null;
  normalizedMarkdownFingerprint?: string | null;
  derivedAssetRefs: string[];
  warnings: ProcessingWarning[];
  degradationMarkers: SourceProcessingDegradationMarker[];
  unsupportedItem?: UnsupportedItemRecord;
  metadata?: Record<string, unknown>;
}

export interface SourceProcessingBundleManifest {
  schemaVersion: SourceProcessingBundleSchemaVersion;
  importRunRef: ImportRunRef;
  connectedSourceRef: ConnectedSourceRef;
  sourceRevisionRef?: SourceRevisionRef | null;
  ingressKind: SourceIngressKind;
  generatedAt: string;
  parserVersion?: string | null;
  rootNodeRefs: string[];
  classificationSummary: SourceProcessingClassificationSummary;
}

export interface SourceProcessingBundle {
  manifest: SourceProcessingBundleManifest;
  items: SourceProcessingBundleItem[];
  structureTree: SourceProcessingStructureNode[];
  derivedAssets: SourceProcessingDerivedAsset[];
}

export interface SourceProcessingItemResult {
  itemRef: string;
  classification: ProcessingItemClassification;
  warningCount: number;
  degradationCount: number;
  derivedAssetCount: number;
  hasNormalizedMarkdown: boolean;
  unsupportedReason?: string;
}

export interface SourceProcessingBundleResult {
  bundle: SourceProcessingBundle;
  summary: SourceProcessingClassificationSummary;
  overallClassification: ProcessingItemClassification;
  itemResults: SourceProcessingItemResult[];
  warnings: ProcessingWarning[];
  unsupportedItems: UnsupportedItemRecord[];
}
