import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRoutes {
  public readonly router: Router;
  private readonly userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/me', this.userController.getProfile);
  }
}
