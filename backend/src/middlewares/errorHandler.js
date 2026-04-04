import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
      },
    });
  }

  // Programming error — log full stack, return generic 500
  console.error("Unexpected error:", err);
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: err.message || "Something went wrong",
      stack: err.stack,
    },
  });
};
