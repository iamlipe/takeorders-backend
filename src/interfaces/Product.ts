export interface NewProduct {
  name: string;
  image?: string;
  price: number;
  categoryId: string;
  stockId: string;
}

export interface UpdateProduct {
  id: string;
  updateProduct: {
    name: string;
    image?: string;
    price: number;
    quantitySold: number;
    categoryId: string;
    stockId: string;
  };
}

export interface RemoveProduct {
  id: string;
}