export const SOURCE_INGRESS_KINDS = ['file', 'folder', 'archive'] as const;

export type SourceIngressKind = (typeof SOURCE_INGRESS_KINDS)[number];

export const IMPORT_RUN_STATUSES = [
  'accepted',
  'processing',
  'bundle_ready',
  'importing',
  'review_required',
  'ready_for_activation',
  'activated',
  'failed',
  'cancelled'
] as const;

export type ImportRunStatus = (typeof IMPORT_RUN_STATUSES)[number];

export type ImportRunTerminalStatus = Extract<
  ImportRunStatus,
  'activated' | 'failed' | 'cancelled'
>;

export const PROCESSING_ITEM_CLASSIFICATIONS = [
  'supported',
  'degraded',
  'unsupported'
] as const;

export type ProcessingItemClassification =
  (typeof PROCESSING_ITEM_CLASSIFICATIONS)[number];

export const PROCESSING_ARTIFACT_KINDS = [
  'bundle_manifest',
  'normalized_markdown',
  'derived_asset',
  'structure_tree',
  'fingerprint_manifest',
  'warning_report',
  'unsupported_items_report'
] as const;

export type ProcessingArtifactKind = (typeof PROCESSING_ARTIFACT_KINDS)[number];

export const IMPORT_REPORT_NEXT_ACTIONS = [
  'none',
  'track',
  'review',
  'activate',
  'retry'
] as const;

export type ImportReportNextAction = (typeof IMPORT_REPORT_NEXT_ACTIONS)[number];

function includesValue<TValue extends string>(
  values: readonly TValue[],
  value: string
): value is TValue {
  return (values as readonly string[]).includes(value);
}

export function isSourceIngressKind(value: string): value is SourceIngressKind {
  return includesValue(SOURCE_INGRESS_KINDS, value);
}

export function isImportRunStatus(value: string): value is ImportRunStatus {
  return includesValue(IMPORT_RUN_STATUSES, value);
}

export function isImportRunTerminalStatus(
  status: ImportRunStatus
): status is ImportRunTerminalStatus {
  return status === 'activated' || status === 'failed' || status === 'cancelled';
}

export function isProcessingItemClassification(
  value: string
): value is ProcessingItemClassification {
  return includesValue(PROCESSING_ITEM_CLASSIFICATIONS, value);
}

export function isProcessingArtifactKind(
  value: string
): value is ProcessingArtifactKind {
  return includesValue(PROCESSING_ARTIFACT_KINDS, value);
}

export function isImportReportNextAction(
  value: string
): value is ImportReportNextAction {
  return includesValue(IMPORT_REPORT_NEXT_ACTIONS, value);
}
