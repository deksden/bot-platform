import assert from 'node:assert/strict';
import { test } from 'node:test';
import type {
  CanonicalResponseDocument,
  OutboundDeliveryIntent,
  OutboundDeliveryResultSummary,
  OutboundThreadingIntent
} from './index';
import {
  classifyOutboundDeliveryTerminalState,
  createDefaultThreadingIntent,
  filterCanonicalResponseDocumentByVisibility,
  isOutboundDeliveryTerminalSuccess,
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

test('channel-runtime default threading keeps reply_to_inbound when inbound ref exists', () => {
  const intent = createDefaultThreadingIntent(
    { mode: 'reply_to_inbound', fallbackMode: 'new_thread' },
    {
      inboundTransportMessageRef: 'transport_message_01',
      inboundThreadRef: 'thread_01',
      supportsReplyToInbound: true
    }
  );

  assert.equal(intent.mode, 'reply_to_inbound');
  assert.equal(intent.inboundTransportMessageRef, 'transport_message_01');
  assert.equal(intent.inboundThreadRef, 'thread_01');
});

test('channel-runtime threading fallback can create new_thread when inbound ref missing', () => {
  const intent = createDefaultThreadingIntent(
    { mode: 'reply_to_inbound', fallbackMode: 'new_thread' },
    {
      inboundTransportMessageRef: null
    }
  );

  assert.equal(intent.mode, 'new_thread');
});

test('channel-runtime threading fallback can disable threading when unsupported', () => {
  const intent = createDefaultThreadingIntent(
    { mode: 'reply_to_inbound', fallbackMode: 'none' },
    {
      inboundTransportMessageRef: 'transport_message_01',
      supportsReplyToInbound: false
    }
  );

  assert.equal(intent.mode, 'none');
});

test('channel-runtime delivery summary classifies delivered as terminal success', () => {
  const deliveredSummary: OutboundDeliveryResultSummary = {
    status: 'delivered',
    channelRef: 'channel_01',
    target: {
      targetRef: 'user_01'
    },
    attemptId: 'attempt_01',
    transportMessageRef: 'transport_message_02',
    traceId: 'trace_01'
  };

  assert.equal(isOutboundDeliveryTerminalSuccess(deliveredSummary), true);
  assert.equal(classifyOutboundDeliveryTerminalState(deliveredSummary), 'success');
});

test('channel-runtime delivery summary distinguishes suppressed and failed', () => {
  const suppressedSummary: OutboundDeliveryResultSummary = {
    status: 'suppressed',
    channelRef: 'channel_01',
    target: {
      targetRef: 'user_01'
    },
    attemptId: 'attempt_02'
  };

  const failedSummary: OutboundDeliveryResultSummary = {
    status: 'failed',
    channelRef: 'channel_01',
    target: {
      targetRef: 'user_01'
    },
    attemptId: 'attempt_03',
    diagnostics: {
      reasonCode: 'transport_timeout',
      summary: 'Send attempt exceeded timeout.'
    }
  };

  assert.equal(classifyOutboundDeliveryTerminalState(suppressedSummary), 'suppressed');
  assert.equal(classifyOutboundDeliveryTerminalState(failedSummary), 'failure');
  assert.equal(isOutboundDeliveryTerminalSuccess(suppressedSummary), false);
  assert.equal(isOutboundDeliveryTerminalSuccess(failedSummary), false);
});

test('channel-runtime public exports include delivery and threading contracts', () => {
  const threadingIntent: OutboundThreadingIntent = {
    mode: 'none'
  };

  const intent: OutboundDeliveryIntent = {
    channelRef: 'channel_01',
    target: {
      targetAddress: 'operator@example.com'
    },
    renderedFormat: 'plain_text',
    threading: threadingIntent,
    correlationId: 'correlation_01'
  };

  assert.equal(intent.threading.mode, 'none');
  assert.equal(typeof createDefaultThreadingIntent, 'function');
  assert.equal(typeof classifyOutboundDeliveryTerminalState, 'function');
});
