export type RuntimeProviderExecutionStage =
  | 'analysis'
  | 'reply'
  | 'verify_outcome'
  | 'review_artifact'
  | 'review_message'
  | 'summary';

export interface CreateRuntimeProviderOptionsInput<
  TProviderKind extends string = string
> {
  providerKind: TProviderKind;
  apiKey: string;
  primaryModelId?: string | undefined;
  analyzeModelId?: string | undefined;
  reviewModelId?: string | undefined;
  summaryModelId?: string | undefined;
}

export interface RuntimeProviderExecutionTarget<
  TProviderKind extends string = string
> {
  providerKey: string;
  providerKind: TProviderKind;
  modelId: string;
  apiKey: string;
}

export interface RuntimeProviderAdapter<
  TRuntimeOptions = unknown,
  TProviderKind extends string = string
> {
  providerKind: TProviderKind;
  defaultPrimaryModelId: string;
  defaultSummaryModelId: string;
  normalizePrimaryModelId(modelId?: string | null): string;
  normalizeSummaryModelId(modelId?: string | null): string;
  createRuntimeOptions(
    input: Omit<CreateRuntimeProviderOptionsInput<TProviderKind>, 'providerKind'>
  ): TRuntimeOptions;
}

export interface RuntimeStageHandlerMap<TRuntimeOptions = unknown> {
  analysis?: (runtime: TRuntimeOptions, inputValue: unknown) => unknown | Promise<unknown>;
  reply?: (runtime: TRuntimeOptions, inputValue: unknown) => unknown | Promise<unknown>;
  verify_outcome?: (runtime: TRuntimeOptions, inputValue: unknown) => unknown | Promise<unknown>;
  review_artifact?: (runtime: TRuntimeOptions, inputValue: unknown) => unknown | Promise<unknown>;
  review_message?: (runtime: TRuntimeOptions, inputValue: unknown) => unknown | Promise<unknown>;
  summary?: (runtime: TRuntimeOptions, inputValue: unknown) => unknown | Promise<unknown>;
}

function unsupportedStage(stage: RuntimeProviderExecutionStage): never {
  throw new Error(`Runtime provider does not support stage ${stage}.`);
}

export async function executeRuntimeStageWithHandlers<TRuntimeOptions>(
  runtime: TRuntimeOptions,
  handlers: RuntimeStageHandlerMap<TRuntimeOptions>,
  stage: RuntimeProviderExecutionStage,
  inputValue: unknown
) {
  const handler = handlers[stage];
  if (!handler) {
    return unsupportedStage(stage);
  }

  return handler(runtime, inputValue);
}

export interface RuntimeProviderAdapterRegistry<
  TProviderKind extends string = string,
  TRuntimeOptions = unknown,
  TAdapter extends RuntimeProviderAdapter<TRuntimeOptions, TProviderKind> = RuntimeProviderAdapter<
    TRuntimeOptions,
    TProviderKind
  >
> {
  getAdapter(providerKind: TProviderKind): TAdapter;
  createRuntimeOptions(input: CreateRuntimeProviderOptionsInput<TProviderKind>): TRuntimeOptions;
  defaultPrimaryModelIdForProvider(providerKind: TProviderKind): string;
  defaultSummaryModelIdForProvider(providerKind: TProviderKind): string;
  normalizePrimaryModelId(providerKind: TProviderKind, modelId?: string | null): string;
  normalizeSummaryModelId(providerKind: TProviderKind, modelId?: string | null): string;
}

export function createRuntimeProviderAdapterRegistry<
  TProviderKind extends string,
  TRuntimeOptions,
  TAdapter extends RuntimeProviderAdapter<TRuntimeOptions, TProviderKind>
>(adapters: Record<TProviderKind, TAdapter>): RuntimeProviderAdapterRegistry<
  TProviderKind,
  TRuntimeOptions,
  TAdapter
> {
  function getAdapter(providerKind: TProviderKind): TAdapter {
    return adapters[providerKind];
  }

  return {
    getAdapter,
    createRuntimeOptions(input) {
      const adapter = getAdapter(input.providerKind);
      return adapter.createRuntimeOptions({
        apiKey: input.apiKey,
        primaryModelId: input.primaryModelId,
        analyzeModelId: input.analyzeModelId,
        reviewModelId: input.reviewModelId,
        summaryModelId: input.summaryModelId
      });
    },
    defaultPrimaryModelIdForProvider(providerKind) {
      return getAdapter(providerKind).defaultPrimaryModelId;
    },
    defaultSummaryModelIdForProvider(providerKind) {
      return getAdapter(providerKind).defaultSummaryModelId;
    },
    normalizePrimaryModelId(providerKind, modelId) {
      return getAdapter(providerKind).normalizePrimaryModelId(modelId);
    },
    normalizeSummaryModelId(providerKind, modelId) {
      return getAdapter(providerKind).normalizeSummaryModelId(modelId);
    }
  };
}
