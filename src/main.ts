
import App from './app';
import { configuration } from './config/configuration';
import { logger } from './logger/logger';
import { databaseProvider } from './providers/database/database.provider';
import type { Server } from 'node:http';
import { redisProvider } from './providers/redis/redis.provider';

const app = new App().app;

let server: Server | undefined;
let isShuttingDown = false;

const startServer = async (): Promise<void> => {
  try {
    await databaseProvider.connect();
    await redisProvider.connect();

    server = app.listen(configuration.PORT, () => {
      logger.info("SplitEase API started successfully", {
        port: configuration.PORT,
        environment: configuration.NODE_ENV,
      });
    });
  } catch (error) {
    logger.error("Failed to start SplitEase API", {
      error: error instanceof Error ? error.message : String(error),
    });

    await databaseProvider.disconnect();
    await redisProvider.disconnect();
    process.exit(1);
  }
};

const shutdown = async (signal: string): Promise<void> => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logger.info("Application shutdown started", { signal });

  try {
    if (server?.listening) {
      await new Promise<void>((resolve, reject) => {
        server?.close((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    await databaseProvider.disconnect();
    await redisProvider.disconnect();

    logger.info("Application shutdown completed");
    process.exit(0);
  } catch (error) {
    logger.error("Application shutdown failed", {
      error: error instanceof Error ? error.message : String(error),
    });

    process.exit(1);
  }
};

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

void startServer();
