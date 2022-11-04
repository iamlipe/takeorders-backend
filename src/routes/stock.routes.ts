import { Router } from 'express';
import { StockController } from '../controllers/stockController';

export class StockRouter {
  public router: Router;

  private StockController: StockController;

  constructor() {
    this.StockController = new StockController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.StockController.create);
    this.router.get('/', this.StockController.get);
    this.router.get('/:id', this.StockController.getById);
  }
}