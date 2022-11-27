import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NewBenefit } from '../interfaces/Benefit';
import { BenefitService } from "../services/benefitService";
import { validateBenefit } from '../validations/validateBenefit';

export class BenefitController {
  private BenefitService: BenefitService;

  constructor() {
    this.BenefitService = new BenefitService();
  }

  public create = async(req: Request, res: Response) => {
    const newBenefit: NewBenefit = req.body;

    await validateBenefit(newBenefit);

    const result = await this.BenefitService.create(newBenefit);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(req: Request, res: Response) => {
    const result = await this.BenefitService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.BenefitService.getById({ id })

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updateBenefit = req.body

    await validateBenefit(updateBenefit)

    const result = await this.BenefitService.update({ id, updateBenefit });

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.BenefitService.remove({ id });

    res.status(StatusCodes.OK).json({ id });
  }
}