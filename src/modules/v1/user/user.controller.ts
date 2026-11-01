
import type { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getProfile = (_req: Request, res: Response): void => {
    const user = this.userService.getProfile();

    res.status(200).json({
      statusCode: 200,
      message: 'User profile fetched successfully',
      data: user,
    });
  };
}
