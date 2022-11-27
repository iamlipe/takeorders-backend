import { Signature } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { 
GetSignatureById,
NewSignature,
QuerySignatures,
RemoveSignature,
UpdateSignature
} from "../interfaces/Signature";
import { SignatureRepository } from "../repositories/signatureRepository";
import { PlanService } from './planService'
import { UserService } from "./userService";
import { ErrorHandler } from "../utils/errorHandler";

export class SignatureService {
  private SignatureRepository: SignatureRepository;

  private PlanService: PlanService;
  
  private UserService: UserService;

  constructor() {
    this.SignatureRepository = new SignatureRepository;
    this.PlanService = new PlanService;
    this.UserService = new UserService;
  }

  public async create(newSignature: NewSignature): Promise<Signature> {
    await this.PlanService.existPlan(newSignature.planId);

    await this.UserService.existUser(newSignature.userId);

    return this.SignatureRepository.create(newSignature);
  }

  public async get(querySignatures: QuerySignatures): Promise<Signature []> {
    await this.PlanService.existPlan(querySignatures.planId);

    await this.UserService.existUser(querySignatures.userId);

    return this.SignatureRepository.get(querySignatures);
  }

  public async getById({ id }: GetSignatureById): Promise<Signature> {
    await this.existSignature(id);

    return this.SignatureRepository.getById({ id });
  }

  public async update({ id, updateSignature }: UpdateSignature): Promise<Signature> {
    await this.existSignature(id);

    return this.SignatureRepository.update({ id, updateSignature })
  }

  public async remove({ id }: RemoveSignature): Promise<void> {
    await this.existSignature(id);

    await this.SignatureRepository.remove({ id })
  }

  public async existSignature(id: string): Promise<void> {
    const exist = await this.SignatureRepository.getById({ id });

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered signature");
    }
  }

}
