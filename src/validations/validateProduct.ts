import * as yup from 'yup';
import { NewProduct } from '../interfaces/Product';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  image: yup.string(),
  price: yup.number().min(0).required(),
  quantitySold: yup.number().min(0),
  categoryId: yup.string().required(),
  stockId: yup.string().required()
});


const schemaUpdate = yup.object().shape({
  quantitySold: yup.number().min(0).required(),
})

export const validateProduct = async(newProduct: NewProduct, update = false) => {
  await schema.validate(newProduct);

  if (update) await schemaUpdate.validate(newProduct);
};
