import { Router } from 'express';
import { PurchaseController } from '../controllers/purchaseController';

export class PurchaseRouter {
  public router: Router;

  private PurchaseController: PurchaseController;

  constructor() {
    this.PurchaseController = new PurchaseController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.PurchaseController.create);
    this.router.get('/', this.PurchaseController.get);
    this.router.get('/:id', this.PurchaseController.getById);
    this.router.put('/:id', this.PurchaseController.update);
    this.router.delete('/:id', this.PurchaseController.remove);
  }
}