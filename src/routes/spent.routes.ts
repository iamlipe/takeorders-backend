import { Router } from 'express';
import { SpentController } from '../controllers/spentController';

export class SpentRouter {
  public router: Router;

  private SpentController: SpentController;

  constructor() {
    this.SpentController = new SpentController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.SpentController.create);
    this.router.get('/', this.SpentController.get);
  }
}