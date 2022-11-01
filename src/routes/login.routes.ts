import { Router } from 'express';
import { LoginController } from '../controllers/loginController';

export class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', LoginController.login());
    this.router.get('/validate', LoginController.validate());
  }
}