export interface NewProduct {
  name: string;
  image?: string;
  price: number;
  quantitySold?: number;
  categoryId: string;
  stockId: string;
}

export interface QueryProducts {
  stockId?: string;
}

export interface GetProductById {
  id: string;
}

export interface UpdateProduct {
  id: string;
  updateProduct: NewProduct;
}

export interface RemoveProduct {
  id: string;
}