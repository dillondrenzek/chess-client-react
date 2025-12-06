/**
 * Base model for supported app errors
 */
export type AppError = { type: "INVALID_MOVE"; name: string; message: string };

export function parseChessJsError(err: unknown): AppError {
  console.info("[INFO] Parsing Chess.js error", err);

  if (err instanceof Error) {
    if (err.message.includes("Invalid move")) {
      return {
        message: err.message,
        name: err.name,
        type: "INVALID_MOVE",
      };
    }
  }

  console.error("Could not parse error:", err);

  throw err;
}
