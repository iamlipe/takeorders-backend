import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NewSignature } from '../interfaces/Signature';
import { SignatureService } from "../services/signatureService";
import { validateSignature } from '../validations/validateSignature';

export class SignatureController {
  private SignatureService: SignatureService;

  constructor() {
    this.SignatureService = new SignatureService();
  }

  public create = async(req: Request, res: Response) => {
    const newSignature: NewSignature = req.body;

    await validateSignature(newSignature);

    const result = await this.SignatureService.create(newSignature);

    res.status(StatusCodes.CREATED).json(result);
  }

  public get = async(req: Request, res: Response) => {
    const result = await this.SignatureService.get(req.query);

    res.status(StatusCodes.OK).json(result);
  }

  public getById = async(req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.SignatureService.getById({ id })

    res.status(StatusCodes.OK).json(result);
  }

  public update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updateSignature = req.body

    await validateSignature(updateSignature)

    const result = await this.SignatureService.update({ id, updateSignature });

    res.status(StatusCodes.OK).json(result);
  }

  public remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    await this.SignatureService.remove({ id });

    res.status(StatusCodes.OK).json({ id });
  }
}