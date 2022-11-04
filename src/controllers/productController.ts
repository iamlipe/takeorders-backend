import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NewProduct } from '../interfaces/Product';
import { ProductService } from "../services/productService";
import { validateProduct } from '../validations/validateProduct';


export class ProductController {
  private ProductService: ProductService;

  constructor() {
    this.ProductService = new ProductService();
  }

  public create = async(req: Request, res: Response) => {
    const newProduct: NewProduct = req.body;

    await validateProduct(newProduct);

    const result = await this.ProductService.create(newProduct);

    res.status(StatusCodes.CREATED).json(result);
  }

  public updateImage = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { filename } = req.file;

    const url = `${process.env.URL}/public/images/${filename.replace(/ /g, "_")}`

    console.log(url);

    await this.ProductService.updateImage({ id, url });

    res.status(StatusCodes.OK).json({ id, url })
  }

  public get = async(req: Request, res: Response) => {
    const result = await this.ProductService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.ProductService.getById({ id })

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updateProduct = req.body

    await validateProduct(updateProduct, true)

    const result = await this.ProductService.update({ id, updateProduct });

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.ProductService.remove({ id });

    res.status(StatusCodes.OK).json({ id });
  }
}