import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from "../services/categoryService";
import { validateCategory } from '../validations/validateCategory';

export class CategoryController {
  private CategoryService: CategoryService;

  constructor() {
    this.CategoryService = new CategoryService();
  }

  public create = async(req: Request, res: Response) => {
    const newCategory = req.body;

    await validateCategory(newCategory);

    const result = await this.CategoryService.create(newCategory);

    res.status(StatusCodes.CREATED).json(result);
  };

  public get = async(req: Request, res: Response) => {
    const result = await this.CategoryService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.CategoryService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  };
}