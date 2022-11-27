import { Router } from 'express';
import { PlanController } from '../controllers/planController';

export class PlanRouter {
  public router: Router;

  private PlanController: PlanController;

  constructor() {
    this.PlanController = new PlanController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.PlanController.create);
    this.router.get('/', this.PlanController.get);
    this.router.get('/:id', this.PlanController.getById);
    this.router.put('/:id', this.PlanController.update);
    this.router.delete('/:id', this.PlanController.remove);
  }
}