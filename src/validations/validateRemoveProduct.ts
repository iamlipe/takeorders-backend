import * as yup from 'yup';
import { RemoveProduct } from '../interfaces/Product';

const schema = yup.object().shape({
  id: yup.string().required(),
});

export const validateRemoveProduct = async({ id }: RemoveProduct) => {
  await schema.validate({ id });
};
