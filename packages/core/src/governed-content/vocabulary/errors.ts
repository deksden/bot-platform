export const GOVERNED_CONTENT_VALIDATION_ERROR_CODES = [
  'missing_required_field',
  'invalid_reference',
  'invalid_status',
  'invalid_classification',
  'invalid_idempotency_key'
] as const;

export type GovernedContentValidationErrorCode =
  (typeof GOVERNED_CONTENT_VALIDATION_ERROR_CODES)[number];

export const GOVERNED_CONTENT_CONFLICT_ERROR_CODES = [
  'import_run_already_exists',
  'source_revision_already_exists',
  'active_revision_conflict',
  'stale_state'
] as const;

export type GovernedContentConflictErrorCode =
  (typeof GOVERNED_CONTENT_CONFLICT_ERROR_CODES)[number];

export interface GovernedContentValidationIssue {
  field?: string;
  message: string;
  code?: GovernedContentValidationErrorCode;
}

export interface GovernedContentValidationError {
  kind: 'validation';
  code: GovernedContentValidationErrorCode;
  message: string;
  issues?: GovernedContentValidationIssue[];
  details?: Record<string, unknown>;
}

export interface GovernedContentConflictError {
  kind: 'conflict';
  code: GovernedContentConflictErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export type GovernedContentMutationError =
  | GovernedContentValidationError
  | GovernedContentConflictError;

export class GovernedContentVocabularyError extends Error {
  readonly error: GovernedContentMutationError;

  constructor(error: GovernedContentMutationError) {
    super(error.message);
    this.name = 'GovernedContentVocabularyError';
    this.error = error;
  }
}

export interface GovernedContentSuccessEnvelope<TValue> {
  ok: true;
  value: TValue;
}

export interface GovernedContentFailureEnvelope {
  ok: false;
  error: GovernedContentMutationError;
}

export type GovernedContentMutationEnvelope<TValue> =
  | GovernedContentSuccessEnvelope<TValue>
  | GovernedContentFailureEnvelope;

export function createGovernedContentValidationError(input: {
  code: GovernedContentValidationErrorCode;
  message: string;
  issues?: GovernedContentValidationIssue[];
  details?: Record<string, unknown>;
}): GovernedContentValidationError {
  return {
    kind: 'validation',
    code: input.code,
    message: input.message,
    ...(input.issues !== undefined ? { issues: input.issues } : {}),
    ...(input.details !== undefined ? { details: input.details } : {})
  };
}

export function createGovernedContentConflictError(input: {
  code: GovernedContentConflictErrorCode;
  message: string;
  details?: Record<string, unknown>;
}): GovernedContentConflictError {
  return {
    kind: 'conflict',
    code: input.code,
    message: input.message,
    ...(input.details !== undefined ? { details: input.details } : {})
  };
}

export function createGovernedContentSuccessEnvelope<TValue>(
  value: TValue
): GovernedContentSuccessEnvelope<TValue> {
  return {
    ok: true,
    value
  };
}

export function createGovernedContentFailureEnvelope(
  error: GovernedContentMutationError | GovernedContentVocabularyError
): GovernedContentFailureEnvelope {
  return {
    ok: false,
    error: error instanceof GovernedContentVocabularyError ? error.error : error
  };
}

export function isGovernedContentMutationError(
  value: unknown
): value is GovernedContentMutationError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'kind' in value &&
    ((value as { kind: unknown }).kind === 'validation' ||
      (value as { kind: unknown }).kind === 'conflict') &&
    'code' in value &&
    typeof (value as { code: unknown }).code === 'string' &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}
