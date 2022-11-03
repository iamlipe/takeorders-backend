import * as yup from 'yup';
import { NewProduct, UpdateProduct } from '../interfaces/Product';

const schema = yup.object().shape({
  id: yup.string().required(),
  updatedProduct: yup.object().shape({
    name: yup.string().min(3).required(),
    image: yup.string(),
    price: yup.number().min(0).required(),
    quantitySold: yup.number().min(0).required(),
    categoryId: yup.string().required(),
    stockId: yup.string().required()
  })
});

export const validateUpdateProduct = async({ id, updatedProduct }: UpdateProduct) => {
  await schema.validate({ id, updatedProduct });
};
