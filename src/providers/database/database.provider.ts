import mongoose from 'mongoose';
import { configuration } from '../../config/configuration';
import { logger } from '../../logger/logger';

export class DatabaseProvider {
  public async connect(): Promise<void> {
    await mongoose.connect(configuration.MONGODB_URI);

    logger.info('MongoDB connected successfully');
  }

  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState === 0) {
      return;
    }

    await mongoose.disconnect();

    logger.info('MongoDB disconnected successfully');
  }
}

export const databaseProvider = new DatabaseProvider();