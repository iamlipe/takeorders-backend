import * as multer from 'multer';
import { Router } from 'express';
import { multerConfig } from '../config/multer';
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
    this.router.patch(
      '/uploadimage/:id',
      multer(multerConfig).single("file"),
      this.ProductController.updateImage,
    );
    this.router.get('/', this.ProductController.get);
    this.router.get('/:id', this.ProductController.getById);
    this.router.put('/:id', this.ProductController.update);
    this.router.delete('/:id', this.ProductController.remove);
  }
}