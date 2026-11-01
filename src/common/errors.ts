import { ERROR_CODES } from './constant';

type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    errorCode: ErrorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
  ) {
    super(message);

    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
