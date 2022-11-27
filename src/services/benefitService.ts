import { Benefit } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { 
GetBenefitById,
NewBenefit,
QueryBenefits,
RemoveBenefit,
UpdateBenefit,
} from "../interfaces/Benefit";
import { BenefitRepository } from "../repositories/benefitRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { PlanService } from './planService'

export class BenefitService {
  private BenefitRepository: BenefitRepository;

  private PlanService: PlanService;

  constructor() {
    this.BenefitRepository = new BenefitRepository;
    this.PlanService = new PlanService;
  }

  public async create(newBenefit: NewBenefit): Promise<Benefit> {
    await this.PlanService.existPlan(newBenefit.planId);

    return this.BenefitRepository.create(newBenefit);
  }

  public async get(queryBenefits: QueryBenefits): Promise<Benefit []> {
    await this.PlanService.existPlan(queryBenefits.planId);

    return this.BenefitRepository.get(queryBenefits);
  }

  public async getById({ id }: GetBenefitById): Promise<Benefit> {
    await this.existBenefit(id);

    return this.BenefitRepository.getById(id);
  }

  public async update({ id, updateBenefit }: UpdateBenefit): Promise<Benefit> {
    await this.existBenefit(id);

    return this.BenefitRepository.update({ id, updateBenefit })
  }

  public async remove({ id }: RemoveBenefit): Promise<void> {
    await this.existBenefit(id);

    await this.BenefitRepository.remove({ id })
  }

  public async existBenefit(id: string): Promise<void> {
    const exist = await this.BenefitRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered benefit");
    }
  }

}
