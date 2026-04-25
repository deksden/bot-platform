import {
  createGovernedContentFailureEnvelope,
  createGovernedContentSuccessEnvelope,
  createGovernedContentValidationError,
  type GovernedContentMutationEnvelope
} from '../vocabulary/errors';
import {
  isImportRunTerminalStatus,
  type ImportRunStatus
} from '../vocabulary/statuses';

export const IMPORT_RUN_ALLOWED_NEXT_STATUSES = {
  accepted: ['processing', 'failed', 'cancelled'],
  processing: ['bundle_ready', 'failed', 'cancelled'],
  bundle_ready: ['importing', 'failed', 'cancelled'],
  importing: ['review_required', 'ready_for_activation', 'failed', 'cancelled'],
  review_required: ['ready_for_activation', 'failed', 'cancelled'],
  ready_for_activation: ['activated', 'failed', 'cancelled'],
  activated: [],
  failed: [],
  cancelled: []
} as const satisfies Record<ImportRunStatus, readonly ImportRunStatus[]>;

export type ImportRunTransitionKind = 'progressed' | 'idempotent_noop';

export interface ImportRunStatusTransitionResult {
  from: ImportRunStatus;
  to: ImportRunStatus;
  transitionKind: ImportRunTransitionKind;
  terminalStatusReached: boolean;
}

export interface ImportRunStatusTransitionInput {
  from: ImportRunStatus;
  to: ImportRunStatus;
  allowIdempotentNoop?: boolean;
}

export function getAllowedImportRunNextStatuses(
  status: ImportRunStatus
): readonly ImportRunStatus[] {
  return IMPORT_RUN_ALLOWED_NEXT_STATUSES[status];
}

export function canTransitionImportRunStatus(
  input: ImportRunStatusTransitionInput
): boolean {
  if (input.from === input.to) {
    return input.allowIdempotentNoop ?? true;
  }

  return getAllowedImportRunNextStatuses(input.from).includes(input.to);
}

export function evaluateImportRunStatusTransition(
  input: ImportRunStatusTransitionInput
): GovernedContentMutationEnvelope<ImportRunStatusTransitionResult> {
  if (input.from === input.to) {
    if (!(input.allowIdempotentNoop ?? true)) {
      return createGovernedContentFailureEnvelope(
        createGovernedContentValidationError({
          code: 'invalid_status',
          message: 'Idempotent no-op transition is not allowed for this operation.',
          issues: [
            {
              field: 'status',
              message: `No-op transition ${input.from} -> ${input.to} is disallowed.`
            }
          ],
          details: {
            from: input.from,
            to: input.to,
            allowIdempotentNoop: false
          }
        })
      );
    }

    return createGovernedContentSuccessEnvelope({
      from: input.from,
      to: input.to,
      transitionKind: 'idempotent_noop',
      terminalStatusReached: isImportRunTerminalStatus(input.to)
    });
  }

  if (getAllowedImportRunNextStatuses(input.from).includes(input.to)) {
    return createGovernedContentSuccessEnvelope({
      from: input.from,
      to: input.to,
      transitionKind: 'progressed',
      terminalStatusReached: isImportRunTerminalStatus(input.to)
    });
  }

  return createGovernedContentFailureEnvelope(
    createGovernedContentValidationError({
      code: 'invalid_status',
      message: `Transition ${input.from} -> ${input.to} is not allowed for ImportRun.`,
      issues: [
        {
          field: 'status',
          message: `Allowed next statuses from ${input.from}: ${getAllowedImportRunNextStatuses(
            input.from
          ).join(', ') || '(none)'}`
        }
      ],
      details: {
        from: input.from,
        to: input.to,
        allowedNextStatuses: getAllowedImportRunNextStatuses(input.from)
      }
    })
  );
}

