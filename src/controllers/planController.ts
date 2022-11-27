import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PlanService } from "../services/planService";
import { validatePlan } from '../validations/validatePlan';

export class PlanController {
  private PlanService: PlanService;

  constructor() {
    this.PlanService = new PlanService();
  }

  public create = async(req: Request, res: Response) => {
    const newPlan = req.body;

    await validatePlan(newPlan);

    const result = await this.PlanService.create(newPlan);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(_req: Request, res: Response) => {
    const result = await this.PlanService.get();

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.PlanService.getById({ id });

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updatePlan = req.body

    const result = await this.PlanService.update({ id, updatePlan })

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.PlanService.remove({ id });

    res.status(StatusCodes.OK).json({ id });
  }
}