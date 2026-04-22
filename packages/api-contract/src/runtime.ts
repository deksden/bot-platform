import { z } from 'zod';

export const runtimeUsageSchema = z.object({
  inputTokens: z.number().int().nonnegative().nullable().default(null),
  outputTokens: z.number().int().nonnegative().nullable().default(null),
  cacheReadTokens: z.number().int().nonnegative().nullable().optional(),
  cacheWriteTokens: z.number().int().nonnegative().nullable().optional(),
  totalTokens: z.number().int().nonnegative().nullable().default(null)
});

export type RuntimeUsage = z.infer<typeof runtimeUsageSchema>;
