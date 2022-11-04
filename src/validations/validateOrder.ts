import * as yup from 'yup';
import { NewOrder } from '../interfaces/Order';

const schema = yup.object().shape({
  quantity: yup.number().min(1).required(),
  productId: yup.string().required(),
  billId: yup.string().required(),
  createAt: yup.date(),
  updatedAt: yup.date()
});

export const validateOrder = async(newOrder: NewOrder) => {
  await schema.validate(newOrder);
};
