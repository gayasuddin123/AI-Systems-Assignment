/**
 * AI Client — OpenRouter integration.
 *
 * OpenRouter provides an OpenAI-compatible API, so we use the
 * official 'openai' npm package with a custom baseURL.
 *
 * Same interface as before:
 *   callAI({ module, systemPrompt, userPrompt }) → parsed JSON
 */

import OpenAI from "openai";
import AIPromptLog from "../models/AIPromptLog.js";
import { settings } from "../config/settings.js";
import logger from "../utils/logger.js";

// ── Initialize OpenAI SDK pointed at OpenRouter ──────
const openrouter = new OpenAI({
  apiKey: settings.openrouterApiKey,
  baseURL: settings.openrouterBaseUrl,
  defaultHeaders: {
    "HTTP-Referer": settings.openrouterSiteUrl,
    "X-Title": settings.openrouterAppName,
  },
});

export class AIClientError extends Error {
  constructor(message, rawResponse = null) {
    super(message);
    this.name = "AIClientError";
    this.rawResponse = rawResponse;
  }
}

/**
 * Extract JSON from AI response text.
 * Some models wrap JSON in markdown code fences — this handles that.
 */
const extractJSON = (text) => {
  let cleaned = text.trim();

  // Remove ```json ... ``` wrapper if present
  const jsonBlockMatch = cleaned.match(
    /```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/
  );
  if (jsonBlockMatch) {
    cleaned = jsonBlockMatch[1].trim();
  }

  // Find the outermost { ... }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned);
};

/**
 * Send a prompt to OpenRouter and return parsed JSON.
 *
 * @param {Object} options
 * @param {string} options.module       - 'category' | 'proposal' etc.
 * @param {string} options.systemPrompt - System-level instruction
 * @param {string} options.userPrompt   - User-level content
 * @param {number} [options.temperature] - Override default temp
 * @param {number} [options.maxTokens]   - Override default max tokens
 * @param {string} [options.model]       - Override default model
 * @param {number} [options.maxRetries=3]
 * @returns {Promise<Object>} Parsed JSON from AI
 */
export const callAI = async ({
  module,
  systemPrompt,
  userPrompt,
  temperature,
  maxTokens,
  model,
  maxRetries = 3,
}) => {
  const temp = temperature ?? settings.openrouterTemperature;
  const tokens = maxTokens ?? settings.openrouterMaxTokens;
  const modelName = model ?? settings.openrouterModel;

  const logEntry = {
    module,
    promptText: userPrompt.substring(0, 10000),
    modelUsed: modelName,
  };

  if (settings.logAiPrompts) {
    logger.info(
      `AI Request [${module}] model=${modelName} temp=${temp} via OpenRouter`
    );
  }

  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const startTime = Date.now();

    try {
      // ── Build the request ───────────────────
      const requestBody = {
        model: modelName,
        temperature: temp,
        max_tokens: tokens,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      };

      // Some models on OpenRouter support response_format
      // We add it but also handle cases where model ignores it
      // by using extractJSON as fallback
      const supportsJsonMode = modelName.includes("gpt") ||
        modelName.includes("gemini") ||
        modelName.includes("claude");

      if (supportsJsonMode) {
        requestBody.response_format = { type: "json_object" };
      }

      // ── Make the API call ───────────────────
      const response = await openrouter.chat.completions.create(requestBody);

      const latency = Date.now() - startTime;
      const rawText = response.choices?.[0]?.message?.content || "";

      // ── Check for empty response ────────────
      if (!rawText.trim()) {
        throw new Error("Empty response received from model");
      }

      // ── Extract token usage ─────────────────
      const tokensPrompt = response.usage?.prompt_tokens || null;
      const tokensCompletion = response.usage?.completion_tokens || null;

      // ── Persist log ─────────────────────────
      await AIPromptLog.create({
        ...logEntry,
        responseText: rawText.substring(0, 20000),
        tokensPrompt,
        tokensCompletion,
        latencyMs: latency,
        isError: false,
      });

      logger.info(
        `AI Response [${module}] latency=${latency}ms ` +
          `tokens_in=${tokensPrompt} tokens_out=${tokensCompletion} ` +
          `model=${modelName}`
      );

      // ── Parse JSON (with fallback extraction) ──
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        // Model might have wrapped JSON in markdown — extract it
        logger.warn(
          `Direct JSON parse failed for [${module}], attempting extraction...`
        );
        parsed = extractJSON(rawText);
      }

      return parsed;

    } catch (error) {
      const latency = Date.now() - startTime;

      // ── Rate limit / transient errors → retry ──
      const status = error?.status || error?.response?.status;
      const errorMsg = error?.message || "";

      const isRateLimit = status === 429 || errorMsg.includes("rate");
      const isOverloaded =
        status === 503 ||
        status === 502 ||
        errorMsg.includes("overloaded") ||
        errorMsg.includes("capacity");
      const isTimeout =
        error?.code === "ETIMEDOUT" ||
        error?.code === "ECONNRESET" ||
        error?.code === "ECONNABORTED" ||
        errorMsg.includes("timeout");
      const isEmptyResponse = errorMsg.includes("Empty response");

      const isTransient =
        isRateLimit || isOverloaded || isTimeout || isEmptyResponse;

      if (isTransient && attempt < maxRetries) {
        lastError = error;
        // Exponential backoff: 2s, 4s, 8s...
        const wait = Math.pow(2, attempt) * 1000;
        const reason = isRateLimit
          ? "rate-limited"
          : isOverloaded
          ? "overloaded"
          : isTimeout
          ? "timeout"
          : "empty response";

        logger.warn(
          `Transient error (${reason}) on attempt ${attempt}/${maxRetries}, ` +
            `retrying in ${wait}ms: ${errorMsg}`
        );
        await new Promise((resolve) => setTimeout(resolve, wait));
        continue;
      }

      // ── JSON parse error (non-retryable) ────
      if (error instanceof SyntaxError) {
        await AIPromptLog.create({
          ...logEntry,
          latencyMs: latency,
          isError: true,
          errorMessage: `JSON parse error: ${error.message}`,
        });
        throw new AIClientError(
          `Model returned invalid JSON: ${error.message}`
        );
      }

      // ── Model not found ─────────────────────
      if (status === 404) {
        await AIPromptLog.create({
          ...logEntry,
          latencyMs: latency,
          isError: true,
          errorMessage: `Model not found: ${modelName}`,
        });
        throw new AIClientError(
          `Model "${modelName}" not found on OpenRouter. ` +
            `Check available models at https://openrouter.ai/models`
        );
      }

      // ── Invalid API key ─────────────────────
      if (status === 401 || status === 403) {
        await AIPromptLog.create({
          ...logEntry,
          latencyMs: latency,
          isError: true,
          errorMessage: `Authentication failed: ${errorMsg}`,
        });
        throw new AIClientError(
          "Invalid OpenRouter API key. Check your OPENROUTER_API_KEY."
        );
      }

      // ── Insufficient credits ────────────────
      if (status === 402) {
        await AIPromptLog.create({
          ...logEntry,
          latencyMs: latency,
          isError: true,
          errorMessage: "Insufficient credits",
        });
        throw new AIClientError(
          "Insufficient OpenRouter credits. Add credits at https://openrouter.ai/credits"
        );
      }

      // ── Content moderation block ────────────
      if (
        errorMsg.includes("content") &&
        (errorMsg.includes("filter") || errorMsg.includes("moderation"))
      ) {
        await AIPromptLog.create({
          ...logEntry,
          latencyMs: latency,
          isError: true,
          errorMessage: `Content filtered: ${errorMsg}`,
        });
        throw new AIClientError(
          "Request blocked by content moderation. Try rephrasing."
        );
      }

      // ── All other errors ────────────────────
      await AIPromptLog.create({
        ...logEntry,
        latencyMs: latency,
        isError: true,
        errorMessage: errorMsg,
      });
      throw new AIClientError(`OpenRouter API error: ${errorMsg}`);
    }
  }

  // ── Exhausted all retries ───────────────────
  await AIPromptLog.create({
    ...logEntry,
    isError: true,
    errorMessage: `Max retries (${maxRetries}) exhausted: ${lastError?.message}`,
  });

  throw new AIClientError(
    `AI call failed after ${maxRetries} attempts: ${lastError?.message}`
  );
};

/**
 * List available models from OpenRouter (utility function).
 * Useful for debugging or building a model selector.
 */
export const listAvailableModels = async () => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        Authorization: `Bearer ${settings.openrouterApiKey}`,
      },
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    logger.error(`Failed to fetch models: ${error.message}`);
    return [];
  }
};