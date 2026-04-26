export type OutboundThreadingMode = 'reply_to_inbound' | 'new_thread' | 'none';

export type OutboundThreadingFallbackMode = Exclude<OutboundThreadingMode, 'reply_to_inbound'>;

export interface OutboundThreadingConfig {
  mode: OutboundThreadingMode;
  fallbackMode?: OutboundThreadingFallbackMode;
}

export interface InboundThreadingContext {
  inboundTransportMessageRef?: string | null;
  inboundThreadRef?: string | null;
  supportsReplyToInbound?: boolean | null;
}

export interface OutboundThreadingIntent {
  mode: OutboundThreadingMode;
  fallbackMode?: OutboundThreadingFallbackMode;
  inboundTransportMessageRef?: string | null;
  inboundThreadRef?: string | null;
}

function resolveThreadingFallbackMode(
  config: OutboundThreadingConfig
): OutboundThreadingFallbackMode {
  return config.fallbackMode ?? 'none';
}

export function createDefaultThreadingIntent(
  config: OutboundThreadingConfig,
  inboundContext?: InboundThreadingContext
): OutboundThreadingIntent {
  const baseIntent = {
    fallbackMode: resolveThreadingFallbackMode(config),
    ...(inboundContext?.inboundTransportMessageRef !== undefined
      ? { inboundTransportMessageRef: inboundContext.inboundTransportMessageRef }
      : {}),
    ...(inboundContext?.inboundThreadRef !== undefined
      ? { inboundThreadRef: inboundContext.inboundThreadRef }
      : {})
  };

  if (config.mode !== 'reply_to_inbound') {
    return {
      mode: config.mode,
      ...baseIntent
    };
  }

  const inboundTargetMissing = !inboundContext?.inboundTransportMessageRef;
  const inboundReplyUnsupported = inboundContext?.supportsReplyToInbound === false;
  if (inboundTargetMissing || inboundReplyUnsupported) {
    return {
      mode: resolveThreadingFallbackMode(config),
      ...baseIntent
    };
  }

  return {
    mode: 'reply_to_inbound',
    ...baseIntent
  };
}
