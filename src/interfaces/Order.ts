export interface NewOrder {
  quantity: number;
  productId: string;
  billId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QueryOrder {
  billId?: string;
}

export interface GetOrderById {
  id: string;
}

export interface UpdateOrder {
  id: string;
  updateOrder: NewOrder;
}

export interface RemoveOrder {
  id: string;
}
