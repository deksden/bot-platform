import {
  createGovernedContentConflictError,
  createGovernedContentFailureEnvelope,
  createGovernedContentSuccessEnvelope,
  isGovernedContentMutationError,
  type GovernedContentConflictErrorCode,
  type GovernedContentMutationEnvelope
} from '../vocabulary/errors';
import type {
  ConnectedSourceRef,
  ImportRunRef,
  SourceRevisionRef
} from '../vocabulary/objects';
import type { ImportRunStatus } from '../vocabulary/statuses';

export interface ImportRunStatusPreconditionInput {
  importRunRef: ImportRunRef;
  expectedStatus: ImportRunStatus | readonly ImportRunStatus[];
  actualStatus: ImportRunStatus;
}

export interface ImportRunIdempotencyConflictInput {
  idempotencyKey: string;
  existingImportRunRef?: ImportRunRef | null;
  reusableImportRunRef?: ImportRunRef | null;
}

export interface SourceRevisionConflictInput {
  stableRevisionKey: string;
  existingSourceRevisionRef?: SourceRevisionRef | null;
  reusableSourceRevisionRef?: SourceRevisionRef | null;
}

export interface ActivationConflictInput {
  connectedSourceRef: ConnectedSourceRef;
  env?: string | null;
  targetSourceRevisionRef: SourceRevisionRef;
  activeSourceRevisionRef?: SourceRevisionRef | null;
}

export function ensureImportRunStatusPrecondition(
  input: ImportRunStatusPreconditionInput
): GovernedContentMutationEnvelope<{
  importRunRef: ImportRunRef;
  expectedStatus: readonly ImportRunStatus[];
  actualStatus: ImportRunStatus;
}> {
  const expectedStatus = normalizeExpectedStatuses(input.expectedStatus);
  if (expectedStatus.includes(input.actualStatus)) {
    return createGovernedContentSuccessEnvelope({
      importRunRef: input.importRunRef,
      expectedStatus,
      actualStatus: input.actualStatus
    });
  }

  return createGovernedContentFailureEnvelope(
    createGovernedContentConflictError({
      code: 'stale_state',
      message:
        'ImportRun state precondition failed. The current state no longer matches the expected state.',
      details: {
        importRunRef: input.importRunRef,
        expectedStatus,
        actualStatus: input.actualStatus
      }
    })
  );
}

export function ensureNoImportRunIdempotencyConflict(
  input: ImportRunIdempotencyConflictInput
): GovernedContentMutationEnvelope<{
  importRunRef: ImportRunRef | null;
  reusedExistingRun: boolean;
}> {
  if (input.existingImportRunRef == null) {
    return createGovernedContentSuccessEnvelope({
      importRunRef: null,
      reusedExistingRun: false
    });
  }

  if (input.reusableImportRunRef === input.existingImportRunRef) {
    return createGovernedContentSuccessEnvelope({
      importRunRef: input.existingImportRunRef,
      reusedExistingRun: true
    });
  }

  return createGovernedContentFailureEnvelope(
    createGovernedContentConflictError({
      code: 'import_run_already_exists',
      message:
        'An ImportRun already exists for this semantic idempotency key and cannot be replaced by this request.',
      details: {
        idempotencyKey: input.idempotencyKey,
        existingImportRunRef: input.existingImportRunRef,
        reusableImportRunRef: input.reusableImportRunRef ?? null
      }
    })
  );
}

export function ensureNoSourceRevisionConflict(
  input: SourceRevisionConflictInput
): GovernedContentMutationEnvelope<{
  sourceRevisionRef: SourceRevisionRef | null;
  reusedExistingRevision: boolean;
}> {
  if (input.existingSourceRevisionRef == null) {
    return createGovernedContentSuccessEnvelope({
      sourceRevisionRef: null,
      reusedExistingRevision: false
    });
  }

  if (input.reusableSourceRevisionRef === input.existingSourceRevisionRef) {
    return createGovernedContentSuccessEnvelope({
      sourceRevisionRef: input.existingSourceRevisionRef,
      reusedExistingRevision: true
    });
  }

  return createGovernedContentFailureEnvelope(
    createGovernedContentConflictError({
      code: 'source_revision_already_exists',
      message:
        'A SourceRevision already exists for this stable revision key and cannot be replaced by this request.',
      details: {
        stableRevisionKey: input.stableRevisionKey,
        existingSourceRevisionRef: input.existingSourceRevisionRef,
        reusableSourceRevisionRef: input.reusableSourceRevisionRef ?? null
      }
    })
  );
}

export function ensureActivationConflictFree(
  input: ActivationConflictInput
): GovernedContentMutationEnvelope<{
  targetSourceRevisionRef: SourceRevisionRef;
  alreadyActive: boolean;
}> {
  if (input.activeSourceRevisionRef == null) {
    return createGovernedContentSuccessEnvelope({
      targetSourceRevisionRef: input.targetSourceRevisionRef,
      alreadyActive: false
    });
  }

  if (input.activeSourceRevisionRef === input.targetSourceRevisionRef) {
    return createGovernedContentSuccessEnvelope({
      targetSourceRevisionRef: input.targetSourceRevisionRef,
      alreadyActive: true
    });
  }

  return createGovernedContentFailureEnvelope(
    createGovernedContentConflictError({
      code: 'active_revision_conflict',
      message:
        'Activation conflict detected. A different revision is already active for this source scope.',
      details: {
        connectedSourceRef: input.connectedSourceRef,
        env: input.env ?? null,
        targetSourceRevisionRef: input.targetSourceRevisionRef,
        activeSourceRevisionRef: input.activeSourceRevisionRef
      }
    })
  );
}

export function isImportRunAlreadyExistsConflict(value: unknown): boolean {
  return hasConflictCode(value, 'import_run_already_exists');
}

export function isSourceRevisionAlreadyExistsConflict(value: unknown): boolean {
  return hasConflictCode(value, 'source_revision_already_exists');
}

export function isActiveRevisionConflict(value: unknown): boolean {
  return hasConflictCode(value, 'active_revision_conflict');
}

export function isStaleStateConflict(value: unknown): boolean {
  return hasConflictCode(value, 'stale_state');
}

function hasConflictCode(
  value: unknown,
  code: GovernedContentConflictErrorCode
): boolean {
  return (
    isGovernedContentMutationError(value) &&
    value.kind === 'conflict' &&
    value.code === code
  );
}

function normalizeExpectedStatuses(
  expectedStatus: ImportRunStatus | readonly ImportRunStatus[]
): readonly ImportRunStatus[] {
  if (typeof expectedStatus === 'string') {
    return [expectedStatus];
  }

  return expectedStatus;
}
