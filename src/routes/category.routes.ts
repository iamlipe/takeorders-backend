import { Router } from 'express';
import { CategoryController } from '../controllers/cateogoryController';

export class CategoryRouter {
  public router: Router;

  private CategoryController: CategoryController;

  constructor() {
    this.CategoryController = new CategoryController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.CategoryController.create);
    this.router.get('/', this.CategoryController.get);
    this.router.get('/:id', this.CategoryController.getById);
  }
}