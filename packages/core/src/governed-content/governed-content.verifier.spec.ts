import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createSourceProcessingBundleResult
} from './source-processing/classification';
import {
  ensureActivationConflictFree,
  ensureImportRunStatusPrecondition,
  ensureNoImportRunIdempotencyConflict,
  ensureNoSourceRevisionConflict,
  isActiveRevisionConflict,
  isImportRunAlreadyExistsConflict,
  isSourceRevisionAlreadyExistsConflict,
  isStaleStateConflict
} from './import-lifecycle/conflict-guards';
import {
  createImportRunIdempotencyKey,
  createSourceRevisionStableKey,
  matchesImportRunIdempotencyKey,
  matchesSourceRevisionStableKey
} from './import-lifecycle/idempotency-keys';
import {
  evaluateImportRunStatusTransition
} from './import-lifecycle/status-transitions';
import type {
  SourceProcessingBundle,
  SourceProcessingBundleItem
} from './source-processing/contracts';
import type { ImportRunStatus } from './vocabulary/statuses';

const supportedItem: SourceProcessingBundleItem = {
  itemRef: 'item-supported',
  classification: 'supported',
  structureNodeRef: 'node-supported',
  provenance: {
    locator: '/fixtures/policies/guide.md',
    sourcePath: '/fixtures/policies/guide.md',
    relativePath: 'policies/guide.md',
    mediaType: 'text/markdown',
    byteSize: 128
  },
  sourceFingerprint: 'sha256:supported',
  normalizedMarkdown: '# Guide',
  normalizedMarkdownFingerprint: 'sha256:markdown-supported',
  derivedAssetRefs: [],
  warnings: [],
  degradationMarkers: [],
  metadata: {}
};

const degradedItem: SourceProcessingBundleItem = {
  itemRef: 'item-degraded',
  classification: 'degraded',
  structureNodeRef: 'node-degraded',
  provenance: {
    locator: '/fixtures/slides/brief.pptx',
    sourcePath: '/fixtures/slides/brief.pptx',
    relativePath: 'slides/brief.pptx',
    mediaType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    byteSize: 256
  },
  sourceFingerprint: 'sha256:degraded',
  normalizedMarkdown: '# Brief',
  normalizedMarkdownFingerprint: 'sha256:markdown-degraded',
  derivedAssetRefs: ['asset-slide-1'],
  warnings: [
    {
      code: 'partial_conversion',
      message: 'One slide image required OCR fallback.',
      sourcePath: 'slides/brief.pptx'
    }
  ],
  degradationMarkers: [
    {
      code: 'ocr_fallback',
      message: 'One embedded image required OCR fallback.'
    }
  ],
  metadata: {}
};

test('source-processing honesty succeeds for a supported plus degraded bundle', () => {
  const bundle: SourceProcessingBundle = {
    manifest: {
      schemaVersion: '1.0.0',
      importRunRef: 'import-run-1',
      connectedSourceRef: 'source-1',
      sourceRevisionRef: 'revision-1',
      ingressKind: 'archive',
      generatedAt: '2026-04-23T12:00:00.000Z',
      parserVersion: 'parser-1.0.0',
      rootNodeRefs: ['node-root'],
      classificationSummary: {
        totalItems: 2,
        supportedItems: 1,
        degradedItems: 1,
        unsupportedItems: 0
      }
    },
    items: [supportedItem, degradedItem],
    structureTree: [
      {
        nodeRef: 'node-root',
        nodeKind: 'root',
        name: 'fixtures',
        relativePath: '',
        parentNodeRef: null,
        childNodeRefs: ['node-supported', 'node-degraded']
      },
      {
        nodeRef: 'node-supported',
        nodeKind: 'file',
        name: 'guide.md',
        relativePath: 'policies/guide.md',
        parentNodeRef: 'node-root',
        childNodeRefs: [],
        itemRef: 'item-supported'
      },
      {
        nodeRef: 'node-degraded',
        nodeKind: 'file',
        name: 'brief.pptx',
        relativePath: 'slides/brief.pptx',
        parentNodeRef: 'node-root',
        childNodeRefs: [],
        itemRef: 'item-degraded'
      }
    ],
    derivedAssets: [
      {
        assetRef: 'asset-slide-1',
        itemRef: 'item-degraded',
        assetKind: 'image',
        relativePath: 'derived/brief-slide-1.png',
        fileName: 'brief-slide-1.png',
        mediaType: 'image/png',
        byteSize: 1024,
        fingerprint: 'sha256:asset-slide-1',
        payloadRef: 'artifact://asset-slide-1',
        metadata: {}
      }
    ]
  };

  const result = createSourceProcessingBundleResult(bundle);

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.overallClassification, 'degraded');
    assert.deepEqual(result.value.summary, {
      totalItems: 2,
      supportedItems: 1,
      degradedItems: 1,
      unsupportedItems: 0
    });
    assert.equal(result.value.itemResults[0]?.hasNormalizedMarkdown, true);
    assert.equal(result.value.itemResults[1]?.degradationCount, 1);
    assert.equal(result.value.warnings.length, 1);
    assert.equal(result.value.unsupportedItems.length, 0);
  }
});

test('source-processing honesty fails for a dishonest unsupported payload', () => {
  const result = createSourceProcessingBundleResult({
    manifest: {
      schemaVersion: '1.0.0',
      importRunRef: 'import-run-2',
      connectedSourceRef: 'source-1',
      ingressKind: 'file',
      generatedAt: '2026-04-23T12:05:00.000Z',
      rootNodeRefs: ['node-root'],
      classificationSummary: {
        totalItems: 1,
        supportedItems: 0,
        degradedItems: 0,
        unsupportedItems: 1
      }
    },
    items: [
      {
        ...supportedItem,
        itemRef: 'item-unsupported',
        structureNodeRef: 'node-unsupported',
        classification: 'unsupported',
        normalizedMarkdown: 'This should not exist for an unsupported item.',
        normalizedMarkdownFingerprint: null,
        warnings: [],
        degradationMarkers: [],
        derivedAssetRefs: [],
        provenance: {
          locator: '/fixtures/diagram.vsd',
          sourcePath: '/fixtures/diagram.vsd',
          relativePath: 'diagram.vsd',
          mediaType: 'application/vnd.visio',
          byteSize: 64
        }
      }
    ],
    structureTree: [
      {
        nodeRef: 'node-root',
        nodeKind: 'root',
        name: 'fixtures',
        relativePath: '',
        parentNodeRef: null,
        childNodeRefs: ['node-unsupported']
      },
      {
        nodeRef: 'node-unsupported',
        nodeKind: 'file',
        name: 'diagram.vsd',
        relativePath: 'diagram.vsd',
        parentNodeRef: 'node-root',
        childNodeRefs: [],
        itemRef: 'item-unsupported'
      }
    ],
    derivedAssets: []
  });

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.error.kind, 'validation');
    assert.equal(result.error.code, 'invalid_classification');
    assert.match(result.error.message, /honesty check failed/i);
    assert.deepEqual(
      result.error.issues?.map((issue) => issue.field).sort(),
      [
        'items.item-unsupported.normalizedMarkdown',
        'items.item-unsupported.unsupportedItem'
      ]
    );
  }
});

test('import lifecycle allows the documented path through activation', () => {
  const documentedPath: readonly ImportRunStatus[] = [
    'accepted',
    'processing',
    'bundle_ready',
    'importing',
    'review_required',
    'ready_for_activation',
    'activated'
  ];

  for (let index = 0; index < documentedPath.length - 1; index += 1) {
    const from = documentedPath[index];
    const to = documentedPath[index + 1];
    assert.ok(from);
    assert.ok(to);

    const result = evaluateImportRunStatusTransition({
      from,
      to
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.transitionKind, 'progressed');
      assert.equal(
        result.value.terminalStatusReached,
        to === 'activated' || to === 'failed' || to === 'cancelled'
      );
    }
  }
});

test('import lifecycle rejects an invalid transition outside the documented path', () => {
  const result = evaluateImportRunStatusTransition({
    from: 'accepted',
    to: 'ready_for_activation'
  });

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.error.kind, 'validation');
    assert.equal(result.error.code, 'invalid_status');
    assert.deepEqual(result.error.details?.allowedNextStatuses, [
      'processing',
      'failed',
      'cancelled'
    ]);
  }
});

test('idempotency and stable revision helpers build deterministic keys', () => {
  const importKeyA = createImportRunIdempotencyKey({
    targetScopeRef: 'workspace/main',
    connectedSourceRef: 'source-1',
    operationKind: 'IMPORT',
    ingressFingerprint: 'sha256:bundle-1',
    env: 'Beta'
  });
  const importKeyB = createImportRunIdempotencyKey({
    targetScopeRef: 'workspace/main',
    connectedSourceRef: 'source-1',
    operationKind: 'import',
    ingressFingerprint: 'sha256:bundle-1',
    env: 'beta'
  });
  const revisionKey = createSourceRevisionStableKey({
    connectedSourceRef: 'source-1',
    revisionFingerprint: 'sha256:revision-1'
  });

  assert.equal(importKeyA.ok, true);
  assert.equal(importKeyB.ok, true);
  assert.equal(revisionKey.ok, true);

  if (importKeyA.ok && importKeyB.ok && revisionKey.ok) {
    assert.equal(
      importKeyA.value,
      'gc.import_run.idempotency.v1:scope=workspace%2Fmain:source=source-1:env=beta:operation=import:fingerprint=sha256%3Abundle-1'
    );
    assert.equal(importKeyA.value, importKeyB.value);
    assert.equal(
      revisionKey.value,
      'gc.source_revision.stable.v1:source=source-1:env=global:fingerprint=sha256%3Arevision-1'
    );
    assert.equal(
      matchesImportRunIdempotencyKey(
        {
          targetScopeRef: 'workspace/main',
          connectedSourceRef: 'source-1',
          operationKind: 'import',
          ingressFingerprint: 'sha256:bundle-1',
          env: 'beta'
        },
        importKeyA.value
      ),
      true
    );
    assert.equal(
      matchesSourceRevisionStableKey(
        {
          connectedSourceRef: 'source-1',
          revisionFingerprint: 'sha256:revision-1'
        },
        revisionKey.value
      ),
      true
    );
  }
});

test('idempotency and stable revision helpers reject incomplete input', () => {
  const importKey = createImportRunIdempotencyKey({
    targetScopeRef: ' ',
    connectedSourceRef: 'source-1',
    operationKind: 'import',
    ingressFingerprint: 'sha256:bundle-1'
  });
  const revisionKey = createSourceRevisionStableKey({
    connectedSourceRef: 'source-1',
    revisionFingerprint: ' '
  });

  assert.equal(importKey.ok, false);
  assert.equal(revisionKey.ok, false);

  if (!importKey.ok) {
    assert.equal(importKey.error.kind, 'validation');
    assert.equal(importKey.error.code, 'invalid_idempotency_key');
  }

  if (!revisionKey.ok) {
    assert.equal(revisionKey.error.kind, 'validation');
    assert.equal(revisionKey.error.code, 'invalid_idempotency_key');
  }
});

test('conflict guards distinguish stale state, duplicate keys, and activation conflicts', () => {
  const staleState = ensureImportRunStatusPrecondition({
    importRunRef: 'import-run-1',
    expectedStatus: 'processing',
    actualStatus: 'importing'
  });
  const duplicateImportRun = ensureNoImportRunIdempotencyConflict({
    idempotencyKey: 'gc.import_run.idempotency.v1:scope=x:source=y:env=beta:operation=import:fingerprint=z',
    existingImportRunRef: 'import-run-1',
    reusableImportRunRef: 'import-run-2'
  });
  const duplicateSourceRevision = ensureNoSourceRevisionConflict({
    stableRevisionKey: 'gc.source_revision.stable.v1:source=source-1:env=beta:fingerprint=sha256%3Arevision-1',
    existingSourceRevisionRef: 'revision-1',
    reusableSourceRevisionRef: 'revision-2'
  });
  const activationConflict = ensureActivationConflictFree({
    connectedSourceRef: 'source-1',
    env: 'beta',
    targetSourceRevisionRef: 'revision-2',
    activeSourceRevisionRef: 'revision-1'
  });

  assert.equal(staleState.ok, false);
  assert.equal(duplicateImportRun.ok, false);
  assert.equal(duplicateSourceRevision.ok, false);
  assert.equal(activationConflict.ok, false);

  if (!staleState.ok) {
    assert.equal(isStaleStateConflict(staleState.error), true);
    assert.equal(isImportRunAlreadyExistsConflict(staleState.error), false);
  }

  if (!duplicateImportRun.ok) {
    assert.equal(isImportRunAlreadyExistsConflict(duplicateImportRun.error), true);
    assert.equal(isSourceRevisionAlreadyExistsConflict(duplicateImportRun.error), false);
  }

  if (!duplicateSourceRevision.ok) {
    assert.equal(
      isSourceRevisionAlreadyExistsConflict(duplicateSourceRevision.error),
      true
    );
    assert.equal(isActiveRevisionConflict(duplicateSourceRevision.error), false);
  }

  if (!activationConflict.ok) {
    assert.equal(isActiveRevisionConflict(activationConflict.error), true);
    assert.equal(isStaleStateConflict(activationConflict.error), false);
  }
});
