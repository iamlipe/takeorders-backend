import { Router } from 'express';
import { ProfitController } from '../controllers/profitController';

export class ProfitRouter {
  public router: Router;

  private ProfitController: ProfitController;

  constructor() {
    this.ProfitController = new ProfitController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get('/', this.ProfitController.get);
  }
}