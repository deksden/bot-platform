import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createCommandRegistry,
  createNotACommandParseResult,
  createParsedCommandResult,
  dispatchCommand,
  evaluateCommandAvailability,
  type CommandDefinition,
  type CommandEnvelope
} from './command-framework';

const BASE_ENVELOPE: CommandEnvelope<Record<string, unknown>, string> = {
  commandKey: 'diagnostics.read',
  rawInput: '/diagnostics',
  normalizedArgs: {},
  actor: {
    actorType: 'workspace_admin',
    actorRef: 'actor-01'
  },
  channel: {
    channelKind: 'telegram',
    channelRef: 'ch-telegram-01'
  },
  ownership: {
    workspaceRef: 'ws-01',
    productInstanceRef: 'pi-01'
  },
  correlation: {
    correlationId: 'corr-01'
  }
};

test('command registry rejects duplicate command keys', () => {
  const definition: CommandDefinition = {
    commandKey: 'diagnostics.read',
    handler: () => ({ ok: true })
  };

  assert.throws(
    () => createCommandRegistry([definition, definition]),
    /Duplicate command key: diagnostics\.read/
  );
});

test('dispatcher returns unknown_command for unregistered command key', async () => {
  const registry = createCommandRegistry([]);

  const result = await dispatchCommand({
    registry,
    parseResult: createParsedCommandResult({
      envelope: BASE_ENVELOPE
    }),
    context: undefined
  });

  assert.equal(result.ok, false);
  if (result.ok) {
    assert.fail('Expected unknown command failure.');
  }
  if ('skipped' in result) {
    assert.fail('Expected command failure, received skipped result.');
  }

  assert.equal(result.failureClass, 'unknown_command');
  assert.equal(result.commandKey, 'diagnostics.read');
});

test('availability policy deny overrides allow for actor, channel kind, and channel ref', () => {
  const actorDecision = evaluateCommandAvailability({
    policy: {
      actorTypes: {
        allow: ['workspace_admin'],
        deny: ['workspace_admin']
      }
    },
    actorType: 'workspace_admin',
    channelKind: 'telegram',
    channelRef: 'ch-01'
  });
  assert.equal(actorDecision.allowed, false);
  if (actorDecision.allowed) {
    assert.fail('Expected actor deny to override allow.');
  }
  assert.equal(actorDecision.reasonCode, 'actor_type_denied');

  const channelKindDecision = evaluateCommandAvailability({
    policy: {
      channelKinds: {
        allow: ['telegram'],
        deny: ['telegram']
      }
    },
    actorType: 'workspace_admin',
    channelKind: 'telegram',
    channelRef: 'ch-01'
  });
  assert.equal(channelKindDecision.allowed, false);
  if (channelKindDecision.allowed) {
    assert.fail('Expected channel kind deny to override allow.');
  }
  assert.equal(channelKindDecision.reasonCode, 'channel_kind_denied');

  const channelRefDecision = evaluateCommandAvailability({
    policy: {
      channelRefs: {
        allow: ['ch-01'],
        deny: ['ch-01']
      }
    },
    actorType: 'workspace_admin',
    channelKind: 'telegram',
    channelRef: 'ch-01'
  });
  assert.equal(channelRefDecision.allowed, false);
  if (channelRefDecision.allowed) {
    assert.fail('Expected channel ref deny to override allow.');
  }
  assert.equal(channelRefDecision.reasonCode, 'channel_ref_denied');
});

test('availability actor allow enables a matching actor type', () => {
  const decision = evaluateCommandAvailability({
    policy: {
      actorTypes: {
        allow: ['employee']
      }
    },
    actorType: 'employee',
    channelKind: 'email',
    channelRef: 'inbox-01'
  });

  assert.equal(decision.allowed, true);
  if (!decision.allowed) {
    assert.fail('Expected employee actor to be allowed.');
  }

  assert.equal(decision.reasonCode, 'policy_allows');
});

test('availability defaults to deny when no policy is provided', () => {
  const decision = evaluateCommandAvailability({
    policy: null,
    actorType: 'workspace_admin',
    channelKind: 'telegram',
    channelRef: 'ch-01'
  });

  assert.equal(decision.allowed, false);
  if (decision.allowed) {
    assert.fail('Expected missing policy to deny by default.');
  }
  assert.equal(decision.reasonCode, 'default_deny');
});

test('dispatcher returns normalized success envelope on handler success', async () => {
  const registry = createCommandRegistry([
    {
      commandKey: 'diagnostics.read',
      availabilityPolicy: {
        actorTypes: {
          allow: ['workspace_admin']
        }
      },
      handler: () => ({
        status: 'ok'
      })
    }
  ]);

  const result = await dispatchCommand({
    registry,
    parseResult: createParsedCommandResult({
      envelope: BASE_ENVELOPE
    }),
    context: undefined
  });

  assert.equal(result.ok, true);
  if (!result.ok) {
    assert.fail('Expected dispatch success.');
  }

  assert.equal(result.commandKey, 'diagnostics.read');
  assert.deepEqual(result.payload, { status: 'ok' });
  assert.equal(result.correlationId, 'corr-01');
});

test('dispatcher returns dispatch_error with safe public summary when handler throws', async () => {
  const registry = createCommandRegistry([
    {
      commandKey: 'diagnostics.read',
      availabilityPolicy: {
        actorTypes: {
          allow: ['workspace_admin']
        }
      },
      handler: () => {
        throw new Error('SECRET_TOKEN=should-never-leak');
      }
    }
  ]);

  const result = await dispatchCommand({
    registry,
    parseResult: createParsedCommandResult({
      envelope: BASE_ENVELOPE
    }),
    context: undefined
  });

  assert.equal(result.ok, false);
  if (result.ok) {
    assert.fail('Expected dispatch error failure.');
  }
  if ('skipped' in result) {
    assert.fail('Expected command failure, received skipped result.');
  }

  assert.equal(result.failureClass, 'dispatch_error');
  assert.equal(result.publicSummary, 'Command handler failed.');
  assert.equal(result.publicSummary.includes('SECRET_TOKEN'), false);
  assert.equal(result.publicSummary.toLowerCase().includes('stack'), false);
});

test('dispatcher returns skipped result for not-a-command parse result', async () => {
  const registry = createCommandRegistry([]);
  const result = await dispatchCommand({
    registry,
    parseResult: createNotACommandParseResult(),
    context: undefined
  });

  assert.equal(result.ok, false);
  if (!('skipped' in result) || !result.skipped) {
    assert.fail('Expected skipped not_a_command result.');
  }
  assert.equal(result.reasonCode, 'not_a_command');
});
