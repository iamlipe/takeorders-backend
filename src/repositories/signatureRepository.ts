import { Signature } from '@prisma/client';
import {
GetSignatureById,
NewSignature,
QuerySignatures,
RemoveSignature,
UpdateSignature
} from '../interfaces/Signature';
import { prisma } from '../utils/connection';

export class SignatureRepository {
  private database = prisma;

  public async create(newSignature: NewSignature): Promise<Signature> {
    const currData = new Date();

    const expiresMonth = currData.getMonth() + 1 > 11 ? 0 : currData.getMonth() + 1;
    const expiresYear = expiresMonth === 0 ? currData.getFullYear() + 1 : currData.getFullYear();

    let expiresData = currData;

    expiresData.setFullYear(expiresYear);
    expiresData.setMonth(expiresMonth);

    return this.database.signature.create({
      data: {...newSignature, canRenew: true, acquiredAt: new Date(), expiresAt: expiresData},
    });
  }

  public async get({ planId, userId }: QuerySignatures): Promise<Signature[]> {
    return this.database.signature.findMany({
      where: { planId, userId }
    });
  }

  public async getById({ id }: GetSignatureById): Promise<Signature> {
    return this.database.signature.findFirst({
      where: { id }
    })
  }

  public async update({ id, updateSignature }: UpdateSignature): Promise<Signature> {
    return this.database.signature.update({
      where: { id },
      data: updateSignature,
    })
  }

  public async remove({ id }: RemoveSignature): Promise<void> {
    await this.database.signature.delete({
      where: { id }
    })
  }
}