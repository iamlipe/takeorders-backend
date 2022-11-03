import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

export class OrderRouter {
  public router: Router;

  private OrderController: OrderController;

  constructor() {
    this.OrderController = new OrderController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.OrderController.create);
    this.router.get('/', this.OrderController.get);
    this.router.put('/', this.OrderController.update);
    this.router.delete('/', this.OrderController.remove);
  }
}