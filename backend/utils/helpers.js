/**
 * Safely parse JSON, stripping markdown code fences if present.
 */
export const safeParseJSON = (text) => {
  let cleaned = text.trim();

  if (cleaned.startsWith("```")) {
    const lines = cleaned.split("\n");
    const filtered = lines.filter((l) => !l.trim().startsWith("```"));
    cleaned = filtered.join("\n");
  }

  return JSON.parse(cleaned);
};

/**
 * Clamp a number between min and max.
 */
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));