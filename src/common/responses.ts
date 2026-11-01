import type { Response } from 'express';

interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: unknown;
}

export class ResponseHandler {
  public static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200,
  ): Response<SuccessResponse<T>> {
    return res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  public static error(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: unknown,
  ): Response<ErrorResponse> {
    return res.status(statusCode).json({
      statusCode,
      message,
      ...(errors !== undefined && { errors }),
    });
  }
}
