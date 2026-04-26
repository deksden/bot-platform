import type { ChannelRef, ExecutionRunRef } from '@dd-bot-platform/core';
import type { ChannelRenderedFormat } from './render';
import type { OutboundThreadingIntent } from './threading';

export type OutboundDeliveryStatus = 'delivered' | 'suppressed' | 'failed';

export type OutboundDeliveryTerminalClassification = 'success' | 'suppressed' | 'failure';

export interface OutboundDeliveryTarget {
  targetRef?: string | null;
  targetAddress?: string | null;
  threadRef?: string | null;
  metadata?: Record<string, unknown>;
}

export interface OutboundDeliveryIntent {
  channelRef: ChannelRef;
  target: OutboundDeliveryTarget;
  documentRef?: string | null;
  renderedMessageRef?: string | null;
  renderedFormat: ChannelRenderedFormat;
  threading: OutboundThreadingIntent;
  correlationId?: string | null;
  traceId?: string | null;
  runId?: ExecutionRunRef | null;
  deliveryId?: string | null;
  attemptId?: string | null;
  extensions?: Record<string, unknown>;
}

export interface OutboundDeliveryDiagnosticsSummary {
  reasonCode?: string;
  summary?: string;
  providerCode?: string;
  retryable?: boolean | null;
  details?: Record<string, unknown>;
}

export interface OutboundDeliveryResultSummary {
  status: OutboundDeliveryStatus;
  channelRef: ChannelRef;
  target: OutboundDeliveryTarget;
  attemptId?: string | null;
  deliveryId?: string | null;
  transportMessageRef?: string | null;
  correlationId?: string | null;
  traceId?: string | null;
  runId?: ExecutionRunRef | null;
  diagnostics?: OutboundDeliveryDiagnosticsSummary;
}

export function classifyOutboundDeliveryTerminalState(
  resultSummary: Pick<OutboundDeliveryResultSummary, 'status'>
): OutboundDeliveryTerminalClassification {
  switch (resultSummary.status) {
    case 'delivered':
      return 'success';
    case 'suppressed':
      return 'suppressed';
    case 'failed':
      return 'failure';
    default: {
      const exhaustiveStatus: never = resultSummary.status;
      return exhaustiveStatus;
    }
  }
}

export function isOutboundDeliveryTerminalSuccess(
  resultSummary: Pick<OutboundDeliveryResultSummary, 'status'>
): boolean {
  return classifyOutboundDeliveryTerminalState(resultSummary) === 'success';
}
