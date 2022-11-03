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
    this.router.put('/', this.ProductController.update);
    this.router.delete('/', this.ProductController.remove);
  }
}