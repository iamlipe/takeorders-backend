import { Router } from 'express';
import { BillController } from '../controllers/billController';

export class BillRouter {
  public router: Router;

  private BillController: BillController;

  constructor() {
    this.BillController = new BillController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.BillController.create);
    this.router.get('/', this.BillController.get);
    this.router.get('/:id', this.BillController.getById);
    this.router.put('/:id', this.BillController.update);
    this.router.patch('/close/:id', this.BillController.closeBill);
    this.router.delete('/:id', this.BillController.remove);
  }
}