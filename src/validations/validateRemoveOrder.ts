import * as yup from 'yup';
import { RemoveOrder } from '../interfaces/Order';

const schema = yup.object().shape({
  id: yup.string().required(),
});

export const validateRemoveOrder = async({ id }: RemoveOrder) => {
  await schema.validate({ id });
};
