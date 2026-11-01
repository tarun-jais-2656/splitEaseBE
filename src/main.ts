import App from './app';
import { configuration } from './config/configuration';
import { logger } from './logger/logger';

const PORT = 3000;
const app = new App().app;

app.listen(configuration.PORT, () => {
  logger.info('SplitEase API started successfully', {
    port: configuration.PORT,
    environment: configuration.NODE_ENV,
  });
});