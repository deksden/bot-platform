import type {
  ImportReportNextAction,
  ImportRunStatus,
  ProcessingArtifactKind,
  ProcessingItemClassification,
  SourceIngressKind
} from './statuses';

export type ConnectedSourceRef = string;
export type SourceRevisionRef = string;
export type ImportRunRef = string;
export type ProcessingArtifactRef = string;

export type SourceRevisionLineageKind = 'candidate';

export type ImportRunOperationKind = 'import' | 'reimport' | (string & {});

export interface ConnectedSourceIngress {
  ingressKind: SourceIngressKind;
  locator: string;
  displayName?: string;
}

export interface ConnectedSource {
  connectedSourceRef: ConnectedSourceRef;
  sourceKey: string;
  ingress: ConnectedSourceIngress;
  createdAt: string;
  updatedAt: string;
  latestImportRunRef?: ImportRunRef | null;
  currentCandidateRevisionRef?: SourceRevisionRef | null;
  lastActivatedRevisionRef?: SourceRevisionRef | null;
  metadata?: Record<string, unknown>;
}

export interface SourceRevision {
  sourceRevisionRef: SourceRevisionRef;
  connectedSourceRef: ConnectedSourceRef;
  lineageKind: SourceRevisionLineageKind;
  revisionFingerprint: string;
  candidateKey: string;
  env?: string | null;
  importRunRef?: ImportRunRef | null;
  processingArtifactRef?: ProcessingArtifactRef | null;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface ImportRun {
  importRunRef: ImportRunRef;
  connectedSourceRef: ConnectedSourceRef;
  status: ImportRunStatus;
  operationKind: ImportRunOperationKind;
  idempotencyKey: string;
  env?: string | null;
  sourceRevisionRef?: SourceRevisionRef | null;
  processingArtifactRefs?: ProcessingArtifactRef[];
  workflowRunRef?: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
  failureReason?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ProcessingWarning {
  code: string;
  message: string;
  sourcePath?: string;
}

export interface UnsupportedItemRecord {
  itemRef: string;
  reason: string;
  sourcePath?: string;
}

export interface ProcessingArtifact {
  processingArtifactRef: ProcessingArtifactRef;
  importRunRef: ImportRunRef;
  connectedSourceRef: ConnectedSourceRef;
  sourceRevisionRef?: SourceRevisionRef | null;
  artifactKind: ProcessingArtifactKind;
  classification: ProcessingItemClassification;
  fingerprint: string;
  payloadRef?: string | null;
  warnings?: ProcessingWarning[];
  unsupportedItems?: UnsupportedItemRecord[];
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface ImportReportSummary {
  totalItems: number;
  supportedItems: number;
  degradedItems: number;
  unsupportedItems: number;
}

export interface ImportReport {
  importRunRef: ImportRunRef;
  connectedSourceRef: ConnectedSourceRef;
  sourceRevisionRef?: SourceRevisionRef | null;
  status: ImportRunStatus;
  nextAction: ImportReportNextAction;
  summary: ImportReportSummary;
  processingArtifactRefs: ProcessingArtifactRef[];
  warnings: ProcessingWarning[];
  unsupportedItems: UnsupportedItemRecord[];
  generatedAt: string;
  metadata?: Record<string, unknown>;
}
