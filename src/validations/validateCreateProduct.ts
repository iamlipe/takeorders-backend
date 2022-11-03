import * as yup from 'yup';
import { NewProduct } from '../interfaces/Product';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  image: yup.string(),
  price: yup.number().min(0).required(),
  categoryId: yup.string().required(),
  stockId: yup.string().required()
});

export const validateCreateProduct = async(newProduct: NewProduct) => {
  await schema.validate(newProduct);
};
