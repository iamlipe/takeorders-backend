import { Router } from 'express';
import { UserController } from '../controllers/userController';

export class LoginRouter {
  public router: Router;

  private UserController: UserController;

  constructor() {
    this.UserController = new UserController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.UserController.login);
    this.router.get('/validate', this.UserController.validate);
  }
}