import express, { Express } from 'express';
import { AppRoutes } from './app.routes';

class App {
  public readonly app: Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.get('/health', (_req, res) => {
      res.status(200).json({
        message: 'SplitEase API is running'
      });
    });

    this.app.use('/api/v1', new AppRoutes().router);
  }
}

export default App;