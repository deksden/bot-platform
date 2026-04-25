import {
  createGovernedContentFailureEnvelope,
  createGovernedContentSuccessEnvelope,
  createGovernedContentValidationError,
  type GovernedContentMutationEnvelope,
  type GovernedContentValidationIssue
} from '../vocabulary/errors';
import type {
  ConnectedSourceRef,
  ImportRunOperationKind
} from '../vocabulary/objects';

const IMPORT_RUN_IDEMPOTENCY_KEY_PREFIX = 'gc.import_run.idempotency.v1';
const SOURCE_REVISION_STABLE_KEY_PREFIX = 'gc.source_revision.stable.v1';
const DEFAULT_ENV_SEGMENT = 'global';

export interface ImportRunIdempotencyKeyInput {
  targetScopeRef: string;
  connectedSourceRef: ConnectedSourceRef;
  operationKind: ImportRunOperationKind;
  ingressFingerprint: string;
  env?: string | null;
}

export interface SourceRevisionStableKeyInput {
  connectedSourceRef: ConnectedSourceRef;
  revisionFingerprint: string;
  env?: string | null;
}

export function createImportRunIdempotencyKey(
  input: ImportRunIdempotencyKeyInput
): GovernedContentMutationEnvelope<string> {
  const issues: GovernedContentValidationIssue[] = [];
  const targetScopeRef = normalizeRequiredSegment(
    input.targetScopeRef,
    'targetScopeRef',
    issues
  );
  const connectedSourceRef = normalizeRequiredSegment(
    input.connectedSourceRef,
    'connectedSourceRef',
    issues
  );
  const operationKind = normalizeRequiredSegment(
    input.operationKind,
    'operationKind',
    issues,
    { normalizeCase: true }
  );
  const ingressFingerprint = normalizeRequiredSegment(
    input.ingressFingerprint,
    'ingressFingerprint',
    issues
  );

  if (issues.length > 0) {
    return createInvalidIdempotencyKeyFailure(
      'Cannot build ImportRun idempotency key from an incomplete semantic request.',
      issues
    );
  }

  const env = normalizeOptionalEnvSegment(input.env);
  return createGovernedContentSuccessEnvelope(
    [
      IMPORT_RUN_IDEMPOTENCY_KEY_PREFIX,
      `scope=${encodeKeySegment(targetScopeRef)}`,
      `source=${encodeKeySegment(connectedSourceRef)}`,
      `env=${encodeKeySegment(env)}`,
      `operation=${encodeKeySegment(operationKind)}`,
      `fingerprint=${encodeKeySegment(ingressFingerprint)}`
    ].join(':')
  );
}

export function createSourceRevisionStableKey(
  input: SourceRevisionStableKeyInput
): GovernedContentMutationEnvelope<string> {
  const issues: GovernedContentValidationIssue[] = [];
  const connectedSourceRef = normalizeRequiredSegment(
    input.connectedSourceRef,
    'connectedSourceRef',
    issues
  );
  const revisionFingerprint = normalizeRequiredSegment(
    input.revisionFingerprint,
    'revisionFingerprint',
    issues
  );

  if (issues.length > 0) {
    return createInvalidIdempotencyKeyFailure(
      'Cannot build SourceRevision stable key without source identity and fingerprint.',
      issues
    );
  }

  const env = normalizeOptionalEnvSegment(input.env);
  return createGovernedContentSuccessEnvelope(
    [
      SOURCE_REVISION_STABLE_KEY_PREFIX,
      `source=${encodeKeySegment(connectedSourceRef)}`,
      `env=${encodeKeySegment(env)}`,
      `fingerprint=${encodeKeySegment(revisionFingerprint)}`
    ].join(':')
  );
}

export function isImportRunIdempotencyKey(value: string): boolean {
  return isStructuredSemanticKey(value, IMPORT_RUN_IDEMPOTENCY_KEY_PREFIX, 6);
}

export function isSourceRevisionStableKey(value: string): boolean {
  return isStructuredSemanticKey(value, SOURCE_REVISION_STABLE_KEY_PREFIX, 4);
}

export function matchesImportRunIdempotencyKey(
  request: ImportRunIdempotencyKeyInput,
  key: string
): boolean {
  const builtKey = createImportRunIdempotencyKey(request);
  return builtKey.ok ? builtKey.value === key : false;
}

export function matchesSourceRevisionStableKey(
  request: SourceRevisionStableKeyInput,
  key: string
): boolean {
  const builtKey = createSourceRevisionStableKey(request);
  return builtKey.ok ? builtKey.value === key : false;
}

function normalizeRequiredSegment(
  value: string,
  field: string,
  issues: GovernedContentValidationIssue[],
  options?: {
    normalizeCase?: boolean;
  }
): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    issues.push({
      code: 'invalid_idempotency_key',
      field,
      message: `${field} must be a non-empty string to build a semantic key.`
    });
    return '';
  }

  return options?.normalizeCase ? trimmed.toLowerCase() : trimmed;
}

function normalizeOptionalEnvSegment(env: string | null | undefined): string {
  const trimmed = env?.trim();
  if (!trimmed) {
    return DEFAULT_ENV_SEGMENT;
  }

  return trimmed.toLowerCase();
}

function encodeKeySegment(value: string): string {
  return encodeURIComponent(value);
}

function isStructuredSemanticKey(
  value: string,
  prefix: string,
  expectedSegments: number
): boolean {
  if (!value.startsWith(`${prefix}:`)) {
    return false;
  }

  const segments = value.split(':');
  if (segments.length !== expectedSegments) {
    return false;
  }

  return segments
    .slice(1)
    .every((segment) => /^\w+=.+$/u.test(segment) && !segment.endsWith('='));
}

function createInvalidIdempotencyKeyFailure(
  message: string,
  issues: GovernedContentValidationIssue[]
): GovernedContentMutationEnvelope<string> {
  return createGovernedContentFailureEnvelope(
    createGovernedContentValidationError({
      code: 'invalid_idempotency_key',
      message,
      issues,
      details: {
        issueCount: issues.length
      }
    })
  );
}

