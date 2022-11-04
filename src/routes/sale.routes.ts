import { Router } from 'express';
import { SaleController } from '../controllers/saleController';

export class SaleRouter {
  public router: Router;

  private SaleController: SaleController;

  constructor() {
    this.SaleController = new SaleController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.SaleController.create);
    this.router.get('/', this.SaleController.get);
    this.router.get('/:id', this.SaleController.getById);
    this.router.put('/:id', this.SaleController.update);
    this.router.delete('/:id', this.SaleController.remove);
  }
}