import { Router } from 'express';
import { ProductController } from '../controllers/productController';

export class ProductRouter {
  public router: Router;

  private ProductController: ProductController;

  constructor() {
    this.ProductController = new ProductController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.ProductController.create);
    this.router.get('/', this.ProductController.get);
    this.router.get('/:id', this.ProductController.getById);
    this.router.put('/:id', this.ProductController.update);
    this.router.delete('/:id', this.ProductController.remove);
  }
}