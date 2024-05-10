interface AppErrorContent {
  message: string;
  context?: { [key: string]: any };
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly logging: boolean;
  public readonly isOperational: boolean;
  public readonly errors: AppErrorContent;

  constructor(params?: {
    statusCode?: number;
    message?: string;
    logging?: boolean;
    isOperational?: boolean;
    context?: { [key: string]: any };
  }) {
    const { statusCode, message, logging, isOperational, context } =
      params || {};

    super(message || "Internal Server Error");

    this.statusCode = statusCode || 500;
    this.logging = logging || false;
    this.isOperational = isOperational || false;
    this.errors = { message: this.message, context: context || {} };

    // Explanation about the Object.setPrototypeOf in Typescript: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    Error.captureStackTrace(this);
  }
}
