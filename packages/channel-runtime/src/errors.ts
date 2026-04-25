export class ChannelRuntimeValidationError extends Error {
  readonly code = 'channel_runtime_validation_error';

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ChannelRuntimeValidationError';
  }
}
