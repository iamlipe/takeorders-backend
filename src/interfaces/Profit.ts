export interface Profit {
  id: string;
  name: string;
  type: 'purchase' | 'sale';
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueryProfit {
  invoiceId: string;
  spentId: string
}