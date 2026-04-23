function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function normalizeBindingValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeBindingValue(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const normalized: Record<string, unknown> = {};
  const sortedKeys = Object.keys(value).sort((left, right) =>
    left.localeCompare(right)
  );

  for (const key of sortedKeys) {
    normalized[key] = normalizeBindingValue(value[key]);
  }

  return normalized;
}

export function normalizePipelineArgs(
  pipelineArgs: Record<string, unknown> | null | undefined
): Record<string, unknown> {
  if (!pipelineArgs) {
    return {};
  }

  const normalized = normalizeBindingValue(pipelineArgs);
  return isPlainObject(normalized) ? normalized : {};
}
