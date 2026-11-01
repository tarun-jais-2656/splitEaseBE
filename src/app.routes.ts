import { Router } from 'express';
import { UserRoutes } from './modules/v1/user/user.routes';

export class AppRoutes {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/users', new UserRoutes().router);
  }
}
