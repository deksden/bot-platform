import { ChannelRuntimeValidationError } from './errors';

export type ChannelRenderTarget = 'telegram' | 'email' | 'web' | (string & {});

export type ChannelRenderedFormat = 'markdown' | 'plain_text';

export interface SplitRenderedMessagePartsOptions {
  maxLength: number;
}

const FENCED_CODE_BLOCK_PATTERN = /```[^\n`]*\n([\s\S]*?)```/g;
const HEADING_PATTERN = /^\s{0,3}#{1,3}\s+/gm;
const UNORDERED_LIST_PATTERN = /^(\s*)[-*+]\s+/gm;
const ORDERED_LIST_PATTERN = /^(\s*)\d+\.\s+/gm;
const BOLD_PATTERN = /(\*\*|__)(.*?)\1/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;
const EXCESSIVE_BREAKS_PATTERN = /\n{3,}/g;

function normalizeMarkdown(markdown: string): string {
  return markdown.replace(/\r\n/g, '\n').trim();
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(HEADING_PATTERN, '')
    .replace(UNORDERED_LIST_PATTERN, '$1• ')
    .replace(ORDERED_LIST_PATTERN, '$11. ')
    .replace(BOLD_PATTERN, '$2')
    .replace(INLINE_CODE_PATTERN, '$1')
    .replace(EXCESSIVE_BREAKS_PATTERN, '\n\n')
    .trim();
}

export function renderChannelMarkdownToPlainText(markdown: string): string {
  if (typeof markdown !== 'string') {
    throw new ChannelRuntimeValidationError('Markdown input must be a string.');
  }

  const normalizedMarkdown = normalizeMarkdown(markdown);
  if (normalizedMarkdown.length === 0) {
    return '';
  }

  return stripMarkdown(
    normalizedMarkdown.replace(FENCED_CODE_BLOCK_PATTERN, (_, codeBlockContent: string) =>
      `\n${codeBlockContent.trimEnd()}\n`
    )
  );
}

function validateMaxLength(maxLength: number): void {
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new ChannelRuntimeValidationError('Message part maxLength must be a positive integer.');
  }
}

function splitLongSegment(segment: string, maxLength: number): string[] {
  if (segment.length <= maxLength) {
    return [segment];
  }

  const lines = segment.split('\n');
  const parts: string[] = [];
  let currentPart = '';

  for (const line of lines) {
    const nextPart = currentPart.length === 0 ? line : `${currentPart}\n${line}`;
    if (nextPart.length <= maxLength) {
      currentPart = nextPart;
      continue;
    }

    if (currentPart.length > 0) {
      parts.push(currentPart);
      currentPart = '';
    }

    if (line.length <= maxLength) {
      currentPart = line;
      continue;
    }

    for (let startIndex = 0; startIndex < line.length; startIndex += maxLength) {
      parts.push(line.slice(startIndex, startIndex + maxLength));
    }
  }

  if (currentPart.length > 0) {
    parts.push(currentPart);
  }

  return parts;
}

export function splitRenderedMessageParts(
  renderedMessage: string,
  options: SplitRenderedMessagePartsOptions
): string[] {
  if (typeof renderedMessage !== 'string') {
    throw new ChannelRuntimeValidationError('Rendered message input must be a string.');
  }

  validateMaxLength(options.maxLength);

  const normalizedMessage = renderedMessage.replace(/\r\n/g, '\n').trim();
  if (normalizedMessage.length === 0) {
    return [];
  }

  const segments = normalizedMessage
    .split(/\n{2,}/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  const parts: string[] = [];
  let currentPart = '';

  for (const segment of segments) {
    const nextPart = currentPart.length === 0 ? segment : `${currentPart}\n\n${segment}`;
    if (nextPart.length <= options.maxLength) {
      currentPart = nextPart;
      continue;
    }

    if (currentPart.length > 0) {
      parts.push(currentPart);
      currentPart = '';
    }

    for (const longSegmentPart of splitLongSegment(segment, options.maxLength)) {
      if (longSegmentPart.length <= options.maxLength) {
        parts.push(longSegmentPart);
        continue;
      }

      throw new ChannelRuntimeValidationError('Rendered message part exceeded maxLength.');
    }
  }

  if (currentPart.length > 0) {
    parts.push(currentPart);
  }

  return parts;
}
