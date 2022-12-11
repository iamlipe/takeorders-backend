import { Plan } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  GetPlanById,
  GetPlanByName,
  NewPlan,
  RemovePlan,
  UpdatePlan,
} from "../interfaces/Plan";
import { PlanRepository } from "../repositories/planRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class PlanService {
  private PlanRepository: PlanRepository;

  constructor() {
    this.PlanRepository = new PlanRepository;
  }

  public async create(newPlan: NewPlan): Promise<Plan> {
    return this.PlanRepository.create(newPlan);
  }

  public async get(): Promise<Plan[]> {
    return this.PlanRepository.get();
  }

  public async getById({ id }: GetPlanById): Promise<Plan> {
    await this.existPlan(id);

    return this.PlanRepository.getById(id);
  }

  public async getByName({ name }: GetPlanByName): Promise<Plan> {
    return this.PlanRepository.getByName(name);
  }
  
  public async update({ id, updatePlan }: UpdatePlan): Promise<Plan> {
    await this.existPlan(id);

    return this.PlanRepository.update({ id, updatePlan });
  }
  
  public async remove({ id }: RemovePlan): Promise<void> {
    await this.existPlan(id);

    return this.PlanRepository.remove({ id });
  }

  public async existPlan(id: string): Promise<void> {
    const exist = await this.PlanRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered plan");
    }
  }

  public async existPlanName(name: string): Promise<void> {
    const exist = await this.PlanRepository.getByName(name);

    if (!exist) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered plan");
    }
  }
}