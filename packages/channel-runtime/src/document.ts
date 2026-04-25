import type { RuntimeUsage } from '@dd-bot-platform/api-contract';
import type { ChannelRef, ExecutionRunRef, IsoTimestamp } from '@dd-bot-platform/core';

export type CanonicalResponseVisibility = 'public' | 'operator' | 'debug';

export interface CanonicalSourceRef {
  sourceId: string;
  sourceType?: string;
  title?: string;
  locator?: string | null;
  uri?: string | null;
  version?: string | null;
  extensions?: Record<string, unknown>;
}

export interface CanonicalCitation {
  citationId?: string;
  sourceRef: CanonicalSourceRef;
  label?: string;
  locator?: string | null;
  quote?: string | null;
  snippet?: string | null;
  uri?: string | null;
  extensions?: Record<string, unknown>;
}

export interface CanonicalResponseBlock {
  blockId?: string;
  kind: 'markdown';
  markdown: string;
  citations?: ReadonlyArray<CanonicalCitation>;
  extensions?: Record<string, unknown>;
}

export interface CanonicalResponseSection {
  sectionId?: string;
  title?: string;
  visibility: CanonicalResponseVisibility;
  blocks: ReadonlyArray<CanonicalResponseBlock>;
  citations?: ReadonlyArray<CanonicalCitation>;
  extensions?: Record<string, unknown>;
}

export interface CanonicalResponseArtifactRef {
  artifactRef: string;
  visibility: Exclude<CanonicalResponseVisibility, 'public'>;
  artifactKind?: string;
  title?: string;
  uri?: string | null;
  mimeType?: string | null;
  traceId?: string | null;
  extensions?: Record<string, unknown>;
}

export interface CanonicalResponseTimingSummary {
  startedAt?: IsoTimestamp | null;
  completedAt?: IsoTimestamp | null;
  durationMs?: number | null;
}

export interface CanonicalResponseMetadata {
  responseId?: string | null;
  runId?: ExecutionRunRef | null;
  traceId?: string | null;
  channelRef?: ChannelRef | null;
  commandId?: string | null;
  attemptId?: string | null;
  deliveryId?: string | null;
  transportMessageRef?: string | null;
  usage?: RuntimeUsage;
  timings?: CanonicalResponseTimingSummary;
  public?: Record<string, unknown>;
  operator?: Record<string, unknown>;
  debug?: Record<string, unknown>;
  extensions?: Record<string, unknown>;
}

export interface CanonicalResponseDocument {
  documentId?: string;
  sections: ReadonlyArray<CanonicalResponseSection>;
  metadata?: CanonicalResponseMetadata;
  artifactRefs?: ReadonlyArray<CanonicalResponseArtifactRef>;
  extensions?: Record<string, unknown>;
}

const VISIBILITY_ORDER: Record<CanonicalResponseVisibility, number> = {
  public: 0,
  operator: 1,
  debug: 2
};

export function isVisibilityAllowed(
  itemVisibility: CanonicalResponseVisibility,
  allowedVisibility: CanonicalResponseVisibility
): boolean {
  return VISIBILITY_ORDER[itemVisibility] <= VISIBILITY_ORDER[allowedVisibility];
}

export function filterCanonicalResponseDocumentByVisibility(
  document: CanonicalResponseDocument,
  allowedVisibility: CanonicalResponseVisibility = 'public'
): CanonicalResponseDocument {
  const metadata = document.metadata;
  const { operator, debug, ...baseMetadata } = metadata ?? {};
  const filteredMetadata = metadata
    ? {
        ...baseMetadata,
        ...(allowedVisibility !== 'public' && operator !== undefined
          ? { operator }
          : {}),
        ...(allowedVisibility === 'debug' && debug !== undefined
          ? { debug }
          : {})
      }
    : undefined;

  return {
    ...document,
    sections: document.sections.filter((section) =>
      isVisibilityAllowed(section.visibility, allowedVisibility)
    ),
    ...(document.artifactRefs
      ? {
          artifactRefs: document.artifactRefs.filter((artifactRef) =>
            isVisibilityAllowed(artifactRef.visibility, allowedVisibility)
          )
        }
      : {}),
    ...(filteredMetadata ? { metadata: filteredMetadata } : {})
  };
}
