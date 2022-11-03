import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NewProduct, RemoveProduct, UpdateProduct } from '../interfaces/Product';
import { ProductService } from "../services/productService";
import { validateCreateProduct } from '../validations/validateCreateProduct';
import { validateRemoveProduct } from '../validations/validateRemoveProduct';
import { validateUpdateProduct } from '../validations/validateUpdateProduct';

export class ProductController {
  private ProductService: ProductService;

  constructor() {
    this.ProductService = new ProductService();
  }

  public create = async(req: Request, res: Response) => {
    const newProduct: NewProduct = req.body;

    await validateCreateProduct(newProduct);

    const result = await this.ProductService.create(newProduct);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(_req: Request, res: Response) => {
    const result = await this.ProductService.get();

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const updatedProduct: UpdateProduct = req.body

    await validateUpdateProduct(updatedProduct);

    const result = await this.ProductService.update(updatedProduct);

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const removeProduct: RemoveProduct = req.body;

    await validateRemoveProduct(removeProduct);

    await this.ProductService.remove(removeProduct);

    console.log(removeProduct);

    res.status(StatusCodes.OK).json(removeProduct);
  }
}