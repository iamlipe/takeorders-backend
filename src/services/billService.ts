import { Bill } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  QueryBill,
  NewBill,
  RemoveBill,
  UpdateBill,
  GetBillById,
  CloseBill,
  UpdateBillImage,
} from "../interfaces/Bill";
import { BillRepository } from "../repositories/billRepository";
import { ErrorHandler } from "../utils/errorHandler";
import { UserService } from "./userService";

export class BillService {
  private BillRepository: BillRepository;

  private UserService: UserService;

  constructor() {
    this.BillRepository = new BillRepository;
    this.UserService = new UserService;
  }

  public async create(newBill: NewBill): Promise<Bill> {
    await this.UserService.existUser(newBill.userId);

    return this.BillRepository.create(newBill); 
  }

  public async get(queryBill: QueryBill): Promise<Bill []> {
    await this.UserService.existUser(queryBill.userId);

    return this.BillRepository.get(queryBill);
  }

  public async getById({ id }: GetBillById): Promise<Bill> {
    await this.existBill(id);

    return this.BillRepository.getById(id);
  }

  public async existBill(id: string): Promise<void> {
    const exist = await this.BillRepository.getById(id);

    if (!exist) { 
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Unregistered bill");
    }
  }

  public async update({ id, updateBill }: UpdateBill): Promise<Bill> {
    await this.existBill(id);

    return this.BillRepository.update({ id, updateBill });
  }

  public async updateImage({ id, url }: UpdateBillImage): Promise<void> {
    await this.existBill(id);

    await this.BillRepository.updateImage({ id, url });
  }

  public async closeBill({ id }: CloseBill): Promise<void> {
    await this.existBill(id);

    await this.BillRepository.closeBill({ id });
  }

  public async remove({ id }: RemoveBill): Promise<void> {
    await this.existBill(id);

    await this.BillRepository.remove({ id });
  }
}