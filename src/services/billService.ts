import { Bill } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { QueryBill, NewBill, RemoveBill, UpdateBill, GetBillById, CloseBill } from "../interfaces/Bill";
import { BillRepository } from "../repositories/billRepository";
import { UserRepository } from "../repositories/userRepository";
import { ErrorHandler } from "../utils/errorHandler";

export class BillService {
  private BillRepository: BillRepository;

  private UserRepository: UserRepository;


  constructor() {
    this.BillRepository = new BillRepository;
    this.UserRepository = new UserRepository;
  }

  public async create(newBill: NewBill): Promise<Bill> {
    return this.BillRepository.create(newBill); 
  }

  public async get(queryBill: QueryBill): Promise<Bill []> {
    const existUser = await this.UserRepository.getById(queryBill.userId);

    if (!existUser) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered user");
    }

    return this.BillRepository.get(queryBill);
  }

  public async getById({ id }: GetBillById): Promise<Bill> {
    return this.BillRepository.getById(id);
  }

  public async update({ id, updateBill }: UpdateBill): Promise<Bill> {
    const existBill = await this.BillRepository.getById(id);

    if (!existBill) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered bill")
    }

    return this.BillRepository.update({ id, updateBill });
  }

  public async closeBill({ id }: CloseBill): Promise<void> {
    const existBill = await this.BillRepository.getById(id);

    if (!existBill) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered bill")
    }

    await this.BillRepository.closeBill({ id });
  }

  public async remove({ id }: RemoveBill): Promise<void> {
    await this.BillRepository.remove({ id });
  }
}