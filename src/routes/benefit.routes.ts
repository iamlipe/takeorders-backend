import { Router } from 'express';
import { BenefitController } from '../controllers/benefitController';

export class BenefitRouter {
  public router: Router;

  private BenefitController: BenefitController;

  constructor() {
    this.BenefitController = new BenefitController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.BenefitController.create);
    this.router.get('/', this.BenefitController.get);
    this.router.get('/:id', this.BenefitController.getById);
    this.router.put('/:id', this.BenefitController.update);
    this.router.delete('/:id', this.BenefitController.remove);
  }
}