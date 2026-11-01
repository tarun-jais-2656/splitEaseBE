import winston from 'winston';
import { configuration } from '../config/configuration';

type LogMetadata = Record<string, unknown>;

export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: configuration.NODE_ENV === 'production' ? 'info' : 'debug',

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),

      transports: [
        new winston.transports.Console(),
      ],
    });
  }

  // Hides sensitive fields in metadata before logging.
  private redact(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map((item) => this.redact(item));
    }

    if (value !== null && typeof value === 'object') {
      const sanitized: LogMetadata = {};

      for (const [key, item] of Object.entries(value)) {
        const isSensitive = [
          'password',
          'authorization',
          'x-access-token',
          'x-refresh-token',
          'accesstoken',
          'refreshtoken',
          'token',
        ].includes(key.toLowerCase());

        sanitized[key] = isSensitive ? '[REDACTED]' : this.redact(item);
      }

      return sanitized;
    }

    return value;
  }

  public info(message: string, metadata?: LogMetadata): void {
    this.logger.info(message, this.redact(metadata));
  }

  public warn(message: string, metadata?: LogMetadata): void {
    this.logger.warn(message, this.redact(metadata));
  }

  public error(message: string, metadata?: LogMetadata): void {
    this.logger.error(message, this.redact(metadata));
  }

  public debug(message: string, metadata?: LogMetadata): void {
    this.logger.debug(message, this.redact(metadata));
  }
}

export const logger = new LoggerService();
