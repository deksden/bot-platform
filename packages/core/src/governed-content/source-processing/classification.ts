import {
  createGovernedContentFailureEnvelope,
  createGovernedContentSuccessEnvelope,
  createGovernedContentValidationError,
  type GovernedContentMutationEnvelope,
  type GovernedContentValidationIssue
} from '../vocabulary/errors';
import type { ProcessingWarning, UnsupportedItemRecord } from '../vocabulary/objects';
import type { ProcessingItemClassification } from '../vocabulary/statuses';
import type {
  SourceProcessingBundle,
  SourceProcessingBundleItem,
  SourceProcessingBundleResult,
  SourceProcessingClassificationSummary,
  SourceProcessingItemResult
} from './contracts';

interface ClassificationCarrier {
  classification: ProcessingItemClassification;
}

interface SourceProcessingHonestyIssue extends GovernedContentValidationIssue {
  itemRef?: string;
}

export function createEmptySourceProcessingClassificationSummary(): SourceProcessingClassificationSummary {
  return {
    totalItems: 0,
    supportedItems: 0,
    degradedItems: 0,
    unsupportedItems: 0
  };
}

export function summarizeSourceProcessingClassifications(
  items: readonly ClassificationCarrier[]
): SourceProcessingClassificationSummary {
  const summary = createEmptySourceProcessingClassificationSummary();

  for (const item of items) {
    summary.totalItems += 1;

    switch (item.classification) {
      case 'supported':
        summary.supportedItems += 1;
        break;
      case 'degraded':
        summary.degradedItems += 1;
        break;
      case 'unsupported':
        summary.unsupportedItems += 1;
        break;
    }
  }

  return summary;
}

export function classifySourceProcessingSummary(
  summary: SourceProcessingClassificationSummary
): ProcessingItemClassification {
  if (summary.unsupportedItems > 0) {
    return 'unsupported';
  }

  if (summary.degradedItems > 0) {
    return 'degraded';
  }

  return 'supported';
}

export function createSourceProcessingItemResult(
  item: SourceProcessingBundleItem
): SourceProcessingItemResult {
  return {
    itemRef: item.itemRef,
    classification: item.classification,
    warningCount: item.warnings.length,
    degradationCount: item.degradationMarkers.length,
    derivedAssetCount: item.derivedAssetRefs.length,
    hasNormalizedMarkdown:
      typeof item.normalizedMarkdown === 'string' && item.normalizedMarkdown.length > 0,
    ...(item.unsupportedItem !== undefined
      ? { unsupportedReason: item.unsupportedItem.reason }
      : {})
  };
}

function collectItemHonestyIssues(
  item: SourceProcessingBundleItem
): SourceProcessingHonestyIssue[] {
  const issues: SourceProcessingHonestyIssue[] = [];

  if (item.classification === 'supported') {
    if (item.unsupportedItem !== undefined) {
      issues.push({
        field: `items.${item.itemRef}.unsupportedItem`,
        code: 'invalid_classification',
        message:
          'supported items cannot include unsupported-item records; use degraded or unsupported classification',
        itemRef: item.itemRef
      });
    }
  }

  if (item.classification === 'degraded') {
    if (item.warnings.length === 0 && item.degradationMarkers.length === 0) {
      issues.push({
        field: `items.${item.itemRef}.classification`,
        code: 'missing_required_field',
        message:
          'degraded items must include at least one warning or degradation marker',
        itemRef: item.itemRef
      });
    }
  }

  if (item.classification === 'unsupported') {
    if (item.unsupportedItem === undefined) {
      issues.push({
        field: `items.${item.itemRef}.unsupportedItem`,
        code: 'missing_required_field',
        message: 'unsupported items must include an unsupported-item record',
        itemRef: item.itemRef
      });
    }

    if (
      typeof item.normalizedMarkdown === 'string' &&
      item.normalizedMarkdown.trim().length > 0
    ) {
      issues.push({
        field: `items.${item.itemRef}.normalizedMarkdown`,
        code: 'invalid_classification',
        message:
          'unsupported items cannot publish normalized markdown content in the bundle result',
        itemRef: item.itemRef
      });
    }
  }

  return issues;
}

function collectExpectedSummaryIssues(
  actualSummary: SourceProcessingClassificationSummary,
  expectedSummary: SourceProcessingClassificationSummary
): SourceProcessingHonestyIssue[] {
  const issues: SourceProcessingHonestyIssue[] = [];

  if (actualSummary.totalItems !== expectedSummary.totalItems) {
    issues.push({
      field: 'manifest.classificationSummary.totalItems',
      code: 'invalid_classification',
      message: `summary totalItems mismatch: expected ${expectedSummary.totalItems}, got ${actualSummary.totalItems}`
    });
  }

  if (actualSummary.supportedItems !== expectedSummary.supportedItems) {
    issues.push({
      field: 'manifest.classificationSummary.supportedItems',
      code: 'invalid_classification',
      message: `summary supportedItems mismatch: expected ${expectedSummary.supportedItems}, got ${actualSummary.supportedItems}`
    });
  }

  if (actualSummary.degradedItems !== expectedSummary.degradedItems) {
    issues.push({
      field: 'manifest.classificationSummary.degradedItems',
      code: 'invalid_classification',
      message: `summary degradedItems mismatch: expected ${expectedSummary.degradedItems}, got ${actualSummary.degradedItems}`
    });
  }

  if (actualSummary.unsupportedItems !== expectedSummary.unsupportedItems) {
    issues.push({
      field: 'manifest.classificationSummary.unsupportedItems',
      code: 'invalid_classification',
      message: `summary unsupportedItems mismatch: expected ${expectedSummary.unsupportedItems}, got ${actualSummary.unsupportedItems}`
    });
  }

  return issues;
}

export function validateSourceProcessingBundleHonesty(input: {
  items: readonly SourceProcessingBundleItem[];
  expectedSummary?: SourceProcessingClassificationSummary;
}): GovernedContentMutationEnvelope<{
  summary: SourceProcessingClassificationSummary;
  overallClassification: ProcessingItemClassification;
  itemResults: SourceProcessingItemResult[];
  warnings: ProcessingWarning[];
  unsupportedItems: UnsupportedItemRecord[];
}> {
  const summary = summarizeSourceProcessingClassifications(input.items);
  const issues: SourceProcessingHonestyIssue[] = [];
  const itemResults: SourceProcessingItemResult[] = [];
  const warnings: ProcessingWarning[] = [];
  const unsupportedItems: UnsupportedItemRecord[] = [];

  for (const item of input.items) {
    issues.push(...collectItemHonestyIssues(item));
    itemResults.push(createSourceProcessingItemResult(item));
    warnings.push(...item.warnings);

    if (item.unsupportedItem !== undefined) {
      unsupportedItems.push(item.unsupportedItem);
    }
  }

  if (input.expectedSummary !== undefined) {
    issues.push(...collectExpectedSummaryIssues(summary, input.expectedSummary));
  }

  if (issues.length > 0) {
    return createGovernedContentFailureEnvelope(
      createGovernedContentValidationError({
        code: 'invalid_classification',
        message: 'source-processing bundle classification honesty check failed',
        issues,
        details: {
          issueCount: issues.length,
          itemRefs: issues
            .map((issue) => issue.itemRef)
            .filter((itemRef): itemRef is string => itemRef !== undefined)
        }
      })
    );
  }

  return createGovernedContentSuccessEnvelope({
    summary,
    overallClassification: classifySourceProcessingSummary(summary),
    itemResults,
    warnings,
    unsupportedItems
  });
}

export function createSourceProcessingBundleResult(
  bundle: SourceProcessingBundle
): GovernedContentMutationEnvelope<SourceProcessingBundleResult> {
  const honestyResult = validateSourceProcessingBundleHonesty({
    items: bundle.items,
    expectedSummary: bundle.manifest.classificationSummary
  });

  if (honestyResult.ok === false) {
    return honestyResult;
  }

  return createGovernedContentSuccessEnvelope({
    bundle,
    summary: honestyResult.value.summary,
    overallClassification: honestyResult.value.overallClassification,
    itemResults: honestyResult.value.itemResults,
    warnings: honestyResult.value.warnings,
    unsupportedItems: honestyResult.value.unsupportedItems
  });
}
