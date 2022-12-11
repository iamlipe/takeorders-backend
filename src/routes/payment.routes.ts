import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';

export class PaymentRouter {
  public router: Router;

  private PaymentController: PaymentController;

  constructor() {
    this.PaymentController = new PaymentController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/create-checkout-session', this.PaymentController.checkoutSession);
    this.router.get('/success', this.PaymentController.portalSession);
    // this.router.post('/create-portal-session', this.PaymentController.portalSession);
    // this.router.post('/webhook', this.PaymentController.Webhook);
  }
}