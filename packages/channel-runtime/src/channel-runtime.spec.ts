import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { CanonicalResponseDocument } from './index';
import {
  filterCanonicalResponseDocumentByVisibility,
  renderChannelMarkdownToPlainText,
  splitRenderedMessageParts
} from './index';

function createVisibilityFixture(): CanonicalResponseDocument {
  return {
    documentId: 'doc_01',
    sections: [
      {
        sectionId: 'public',
        visibility: 'public',
        blocks: [{ kind: 'markdown', markdown: '# Public\n\nHello **world**.' }]
      },
      {
        sectionId: 'operator',
        visibility: 'operator',
        blocks: [{ kind: 'markdown', markdown: 'Operator notes.' }]
      },
      {
        sectionId: 'debug',
        visibility: 'debug',
        blocks: [{ kind: 'markdown', markdown: 'Debug traces.' }]
      }
    ],
    metadata: {
      responseId: 'response_01',
      runId: 'run_01',
      traceId: 'trace_01',
      public: { summary: 'public' },
      operator: { summary: 'operator' },
      debug: { summary: 'debug' }
    },
    artifactRefs: [
      {
        artifactRef: 'artifact_operator',
        visibility: 'operator',
        title: 'Operator artifact'
      },
      {
        artifactRef: 'artifact_debug',
        visibility: 'debug',
        title: 'Debug artifact'
      }
    ]
  };
}

test('channel-runtime public exports support deterministic visibility filtering', () => {
  const fixture = createVisibilityFixture();

  const publicDocument = filterCanonicalResponseDocumentByVisibility(fixture, 'public');
  const operatorDocument = filterCanonicalResponseDocumentByVisibility(fixture, 'operator');
  const debugDocument = filterCanonicalResponseDocumentByVisibility(fixture, 'debug');

  assert.deepEqual(
    publicDocument.sections.map((section) => section.sectionId),
    ['public']
  );
  assert.equal(publicDocument.metadata?.operator, undefined);
  assert.equal(publicDocument.metadata?.debug, undefined);
  assert.deepEqual(publicDocument.artifactRefs, []);

  assert.deepEqual(
    operatorDocument.sections.map((section) => section.sectionId),
    ['public', 'operator']
  );
  assert.equal(operatorDocument.metadata?.operator?.summary, 'operator');
  assert.equal(operatorDocument.metadata?.debug, undefined);
  assert.deepEqual(
    operatorDocument.artifactRefs?.map((artifactRef) => artifactRef.artifactRef),
    ['artifact_operator']
  );

  assert.deepEqual(
    debugDocument.sections.map((section) => section.sectionId),
    ['public', 'operator', 'debug']
  );
  assert.equal(debugDocument.metadata?.debug?.summary, 'debug');
  assert.deepEqual(
    debugDocument.artifactRefs?.map((artifactRef) => artifactRef.artifactRef),
    ['artifact_operator', 'artifact_debug']
  );
});

test('channel-runtime markdown helper renders supported subset to plain text', () => {
  const rendered = renderChannelMarkdownToPlainText(
    '# Heading\n\n- First\n- **Second**\n\n1. `Code`\n\n```ts\nconst value = 1;\n```'
  );

  assert.equal(rendered, 'Heading\n\n• First\n• Second\n\n1. Code\n\nconst value = 1;');
});

test('channel-runtime split helper chunks deterministic message parts', () => {
  const parts = splitRenderedMessageParts(
    'First paragraph.\n\nSecond paragraph.\n\nThird paragraph is longer.',
    { maxLength: 32 }
  );

  assert.deepEqual(parts, [
    'First paragraph.',
    'Second paragraph.',
    'Third paragraph is longer.'
  ]);
});

test('channel-runtime split helper rejects invalid maxLength', () => {
  assert.throws(
    () => splitRenderedMessageParts('hello', { maxLength: 0 }),
    /positive integer/
  );
});
