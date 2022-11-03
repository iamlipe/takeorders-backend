import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from "../services/categoryService";
import { validateCreateCategory } from '../validations/validateCreateCategory';

export class CategoryController {
  private CategoryService: CategoryService;

  constructor() {
    this.CategoryService = new CategoryService();
  }

  public create = async(req: Request, res: Response) => {
    const { name } = req.body;

    await validateCreateCategory({ name });

    const result = await this.CategoryService.create({ name });

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(_req: Request, res: Response) => {
    const result = await this.CategoryService.get();

    res.status(StatusCodes.OK).json(result);
  };
}