import type { VersionToken } from './refs';

export type ControlPlaneValidationCode = 'invalid_input' | 'invalid_relation';

export type ControlPlaneConflictCode =
  | 'stale_write'
  | 'concurrent_mutation'
  | 'duplicate_relation';

export interface ControlPlaneMutationIssue {
  path?: string | null;
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ControlPlaneValidationError<
  TCode extends string = ControlPlaneValidationCode
> {
  kind: 'validation';
  code: TCode;
  message: string;
  issues: ControlPlaneMutationIssue[];
  details: Record<string, unknown>;
}

export interface ControlPlaneConflictError<TCode extends string = ControlPlaneConflictCode> {
  kind: 'conflict';
  code: TCode;
  message: string;
  expectedVersionToken?: VersionToken | null;
  actualVersionToken?: VersionToken | null;
  details: Record<string, unknown>;
}

export type ControlPlaneMutationErrorEnvelope = ControlPlaneValidationError | ControlPlaneConflictError;

export type ControlPlaneMutationEnvelope<TValue> =
  | {
      ok: true;
      value: TValue;
    }
  | {
      ok: false;
      error: ControlPlaneMutationErrorEnvelope;
    };

export class ControlPlaneMutationError extends Error {
  readonly kind: ControlPlaneMutationErrorEnvelope['kind'];
  readonly code: string;
  readonly details: Record<string, unknown>;
  readonly issues: ControlPlaneMutationIssue[];
  readonly expectedVersionToken: VersionToken | null;
  readonly actualVersionToken: VersionToken | null;

  constructor(input: ControlPlaneMutationErrorEnvelope) {
    super(input.message);
    this.name = 'ControlPlaneMutationError';
    this.kind = input.kind;
    this.code = input.code;
    this.details = input.details;
    this.issues = input.kind === 'validation' ? input.issues : [];
    this.expectedVersionToken =
      input.kind === 'conflict' ? (input.expectedVersionToken ?? null) : null;
    this.actualVersionToken =
      input.kind === 'conflict' ? (input.actualVersionToken ?? null) : null;
  }
}

export function createControlPlaneValidationError(input: {
  code: ControlPlaneValidationCode;
  message: string;
  issues?: ControlPlaneMutationIssue[];
  details?: Record<string, unknown>;
}): ControlPlaneValidationError {
  return {
    kind: 'validation',
    code: input.code,
    message: input.message,
    issues: input.issues ?? [],
    details: input.details ?? {}
  };
}

export function createControlPlaneConflictError(input: {
  code: ControlPlaneConflictCode;
  message: string;
  expectedVersionToken?: VersionToken | null;
  actualVersionToken?: VersionToken | null;
  details?: Record<string, unknown>;
}): ControlPlaneConflictError {
  return {
    kind: 'conflict',
    code: input.code,
    message: input.message,
    expectedVersionToken: input.expectedVersionToken ?? null,
    actualVersionToken: input.actualVersionToken ?? null,
    details: input.details ?? {}
  };
}

export function createControlPlaneMutationFailure<TValue>(
  error: ControlPlaneMutationErrorEnvelope
): ControlPlaneMutationEnvelope<TValue> {
  return {
    ok: false,
    error
  };
}

export function createControlPlaneMutationSuccess<TValue>(
  value: TValue
): ControlPlaneMutationEnvelope<TValue> {
  return {
    ok: true,
    value
  };
}

export function isControlPlaneMutationFailure<TValue>(
  envelope: ControlPlaneMutationEnvelope<TValue>
): envelope is {
  ok: false;
  error: ControlPlaneMutationErrorEnvelope;
} {
  return envelope.ok === false;
}
