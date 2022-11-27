import { Benefit } from '@prisma/client';
import {
NewBenefit,
QueryBenefits,
RemoveBenefit,
UpdateBenefit,
} from '../interfaces/Benefit';
import { prisma } from '../utils/connection';

export class BenefitRepository {
  private database = prisma;

  public async create(newBenefit: NewBenefit): Promise<Benefit> {
    return this.database.benefit.create({
      data: newBenefit,
    });
  }

  public async get({ planId }: QueryBenefits): Promise<Benefit[]> {
    return this.database.benefit.findMany({
      where: { planId }
    });
  }

  public async getById(id: string): Promise<Benefit> {
    return this.database.benefit.findFirst({
      where: { id }
    })
  }

  public async update({ id, updateBenefit }: UpdateBenefit): Promise<Benefit> {
    return this.database.benefit.update({
      where: { id },
      data: updateBenefit,
    })
  }

  public async remove({ id }: RemoveBenefit): Promise<void> {
    await this.database.benefit.delete({
      where: { id }
    })
  }
}