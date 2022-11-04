import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController';

export class InvoiceRouter {
  public router: Router;

  private InvoiceController: InvoiceController;

  constructor() {
    this.InvoiceController = new InvoiceController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.InvoiceController.create);
    this.router.get('/', this.InvoiceController.get);
    this.router.get('/:id', this.InvoiceController.getById);
  }
}