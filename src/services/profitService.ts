import { Profit, QueryProfit } from "../interfaces/Profit";
import { PurchaseRepository } from "../repositories/purchaseRepository";
import { SaleRepository } from "../repositories/saleRepository";
import { InvoiceService } from "./invoiceService";
import { SpentService } from "./spentService";

export class ProfitService {
  private PurchaseRepository: PurchaseRepository;

  private InvoiceService: InvoiceService;

  private SaleRepository: SaleRepository;

  private SpentService: SpentService;

  constructor() {
    this.PurchaseRepository = new PurchaseRepository;
    this.InvoiceService = new InvoiceService;
    this.SaleRepository = new SaleRepository;
    this.SpentService = new SpentService;
  }

  public async get({ spentId, invoiceId }: QueryProfit): Promise<Profit []> {
    await this.SpentService.existSpent(spentId);

    await this.InvoiceService.existInvoice(invoiceId);

    const allPurchases = await this.getPurchaseProfit(spentId);

    const allSales = await this.getSalesProfit(invoiceId);
    
    const allProfit: Profit[] = [...allPurchases, ...allSales];

    return allProfit.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  private async getPurchaseProfit(spentId: string): Promise<Profit []> {
    const purchases: Profit[] = 
      (await this.PurchaseRepository.get({ spentId })).map((purchase) => {
        return {
          id: purchase.id,
          name: purchase.expanse,
          type: 'purchase',
          price: purchase.totalPrice,
          createdAt: purchase.createdAt,
          updatedAt: purchase.updatedAt,
        }
      });

    return purchases;
  }

  private async getSalesProfit(invoiceId: string): Promise<Profit []> {
    const sales: Profit[] = 
      (await this.SaleRepository.get({ invoiceId })).map((sale) => {
        return {
          id: sale.id,
          name: sale.name,
          type: 'sale',
          price: sale.totalPrice,
          createdAt: sale.createdAt,
          updatedAt: sale.updatedAt,
        };
      });

    return sales;
  }
}