import { AppError } from "./AppError";

class ErrorHandler {
  async handleError(err: any) {
    const { statusCode, logging, errors } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            statusCode: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }
    return { statusCode, errors };
  }

  public isTrustedError(error: any) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
