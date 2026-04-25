import assert from 'node:assert/strict';
import test from 'node:test';
import {
  governedContentImportDetailEnvelopeSchema,
  governedContentSurfaceDetailReadbackSchema,
  governedContentSurfaceListReadbackSchema,
  governedContentSurfaceReadbackSchema
} from './read-models';

const meta = {
  requestId: 'req-1',
  correlationId: 'corr-1',
  generatedAt: '2026-04-23T12:00:00.000Z'
};

const connectedSource = {
  connectedSourceRef: 'source-1',
  sourceKey: 'docs/source-1',
  ingress: {
    ingressKind: 'folder',
    locator: '/imports/source-1',
    displayName: 'Source One'
  },
  createdAt: '2026-04-23T12:00:00.000Z',
  updatedAt: '2026-04-23T12:10:00.000Z',
  latestImportRunRef: 'import-run-1',
  currentCandidateRevisionRef: 'revision-1',
  lastActivatedRevisionRef: 'revision-0',
  metadata: {
    owner: 'framework'
  }
};

const sourceRevision = {
  sourceRevisionRef: 'revision-1',
  connectedSourceRef: 'source-1',
  lineageKind: 'candidate',
  revisionFingerprint: 'sha256:revision-1',
  candidateKey: 'candidate-1',
  env: 'beta',
  importRunRef: 'import-run-1',
  processingArtifactRef: 'artifact-1',
  createdAt: '2026-04-23T12:00:00.000Z',
  updatedAt: '2026-04-23T12:10:00.000Z',
  metadata: {}
};

const importRun = {
  importRunRef: 'import-run-1',
  connectedSourceRef: 'source-1',
  status: 'review_required',
  operationKind: 'import',
  idempotencyKey:
    'gc.import_run.idempotency.v1:scope=workspace%2Fmain:source=source-1:env=beta:operation=import:fingerprint=sha256%3Abundle-1',
  env: 'beta',
  sourceRevisionRef: 'revision-1',
  processingArtifactRefs: ['artifact-1'],
  workflowRunRef: 'workflow-1',
  createdAt: '2026-04-23T12:00:00.000Z',
  updatedAt: '2026-04-23T12:10:00.000Z',
  completedAt: null,
  failureReason: null,
  metadata: {
    attempt: 1
  }
};

const processingArtifact = {
  processingArtifactRef: 'artifact-1',
  importRunRef: 'import-run-1',
  connectedSourceRef: 'source-1',
  sourceRevisionRef: 'revision-1',
  artifactKind: 'bundle_manifest',
  classification: 'degraded',
  fingerprint: 'sha256:artifact-1',
  payloadRef: 'artifact://bundle-1',
  warnings: [
    {
      code: 'partial_conversion',
      message: 'One embedded image required OCR fallback.',
      sourcePath: 'slides/brief.pptx'
    }
  ],
  unsupportedItems: [],
  createdAt: '2026-04-23T12:05:00.000Z',
  metadata: {}
};

const importReport = {
  importRunRef: 'import-run-1',
  connectedSourceRef: 'source-1',
  sourceRevisionRef: 'revision-1',
  status: 'review_required',
  nextAction: 'review',
  summary: {
    totalItems: 2,
    supportedItems: 1,
    degradedItems: 1,
    unsupportedItems: 0
  },
  processingArtifactRefs: ['artifact-1'],
  warnings: [
    {
      code: 'partial_conversion',
      message: 'One embedded image required OCR fallback.',
      sourcePath: 'slides/brief.pptx'
    }
  ],
  unsupportedItems: [],
  generatedAt: '2026-04-23T12:10:00.000Z',
  metadata: {}
};

test('governed-content read models parse representative shared list and detail payloads', () => {
  const sourcesReadback = governedContentSurfaceListReadbackSchema.parse({
    surfaceId: 'gc-sources',
    payload: {
      items: [connectedSource],
      page: {
        limit: 20,
        nextCursor: null,
        totalCount: 1
      },
      meta
    }
  });

  const importDetailReadback = governedContentSurfaceDetailReadbackSchema.parse({
    surfaceId: 'gc-import-detail',
    itemRef: 'import-run-1',
    payload: {
      item: {
        importRun,
        source: connectedSource,
        sourceRevision,
        report: importReport,
        processingArtifacts: [processingArtifact]
      },
      meta
    }
  });

  const artifactDetailReadback = governedContentSurfaceDetailReadbackSchema.parse({
    surfaceId: 'gc-artifacts',
    itemRef: 'artifact-1',
    payload: {
      item: processingArtifact,
      meta
    }
  });

  assert.equal(sourcesReadback.surfaceId, 'gc-sources');
  assert.equal(sourcesReadback.payload.items[0]?.ingress.ingressKind, 'folder');
  assert.equal(importDetailReadback.surfaceId, 'gc-import-detail');
  assert.equal(importDetailReadback.payload.item.report?.nextAction, 'review');
  assert.equal('processingArtifactRef' in artifactDetailReadback.payload.item, true);
  if ('processingArtifactRef' in artifactDetailReadback.payload.item) {
    assert.equal(artifactDetailReadback.payload.item.classification, 'degraded');
  }
});

test('governed-content read models reject a bounded invalid shared payload shape', () => {
  const result = governedContentImportDetailEnvelopeSchema.safeParse({
    item: {
      importRun: {
        ...importRun,
        status: 'queued'
      },
      source: connectedSource,
      sourceRevision,
      report: importReport,
      processingArtifacts: [processingArtifact]
    },
    meta
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.deepEqual(result.error.issues[0]?.path, [
      'item',
      'importRun',
      'status'
    ]);
  }
});
