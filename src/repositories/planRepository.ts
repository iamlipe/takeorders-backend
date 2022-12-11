import { prisma } from '../utils/connection';
import { 
  NewPlan,
  RemovePlan,
  UpdatePlan,
} from "../interfaces/Plan";
import { Plan } from '@prisma/client';

export class PlanRepository {
  private database = prisma;

  public async create(newPlan: NewPlan): Promise<Plan> {
    return this.database.plan.create({
      data: newPlan,
    })
  }

  public async get(): Promise<Plan[]> {
    return this.database.plan.findMany({
      select: { id: true, name: true, price: true, benefits: true }
    });
  }

  public async getById(id: string): Promise<Plan> {
    return this.database.plan.findFirst({
      where: { id }
    })
  }

  public async getByName(name: string): Promise<Plan> {
    return this.database.plan.findFirst({
      where: { name }
    })
  }

  public async update({ id, updatePlan }: UpdatePlan): Promise<Plan> {
    return this.database.plan.update({
      where: { id },
      data: updatePlan
    })
  }

  public async remove({ id }: RemovePlan): Promise<void> {
    await this.database.plan.delete({
      where: { id }
    })
  }

}