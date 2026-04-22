export interface RuntimeProviderUsage {
  inputTokens: number | null;
  outputTokens: number | null;
  cacheReadTokens?: number | null | undefined;
  cacheWriteTokens?: number | null | undefined;
  totalTokens: number | null;
}

export interface RuntimeProviderMetadata<
  TProviderAttempt = unknown,
  TPromptMeta = unknown,
  TGenerationAttempt = unknown
> {
  provider?: string | null;
  modelId?: string | null;
  finishReason?: string | null;
  usage?: RuntimeProviderUsage | null;
  latencyMs?: number | null;
  providerAttemptCount?: number | null;
  providerRetryCount?: number | null;
  providerAttempts?: TProviderAttempt[] | null;
  promptMeta?: TPromptMeta | null;
  generationAttempts?: TGenerationAttempt[] | null;
}

export interface RuntimeProviderResultEnvelope<
  TOutput,
  TMetadata = RuntimeProviderMetadata
> {
  output: TOutput;
  metadata?: TMetadata | null;
}

export function isProviderResultEnvelope<TOutput, TMetadata = RuntimeProviderMetadata>(
  value: unknown
): value is RuntimeProviderResultEnvelope<TOutput, TMetadata> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'output' in value &&
    (!('metadata' in value) ||
      typeof (value as { metadata?: unknown }).metadata === 'object' ||
      (value as { metadata?: unknown }).metadata === null ||
      (value as { metadata?: unknown }).metadata === undefined)
  );
}

export function normalizeProviderResult<TOutput, TMetadata = RuntimeProviderMetadata>(
  value: unknown
): {
  output: TOutput;
  metadata: TMetadata | null;
} {
  if (isProviderResultEnvelope<TOutput, TMetadata>(value)) {
    return {
      output: value.output,
      metadata: value.metadata ?? null
    };
  }

  return {
    output: value as TOutput,
    metadata: null
  };
}

export function extractProviderMetadataFromError<TMetadata = RuntimeProviderMetadata>(
  error: unknown
): TMetadata | null {
  if (typeof error === 'object' && error !== null && 'runtimeProviderMetadata' in error) {
    const metadata = (error as { runtimeProviderMetadata?: unknown }).runtimeProviderMetadata;
    return metadata && typeof metadata === 'object' ? (metadata as TMetadata) : null;
  }

  return null;
}
