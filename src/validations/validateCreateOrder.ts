import * as yup from 'yup';
import { NewOrder } from '../interfaces/Order';

const schema = yup.object().shape({
  quantity: yup.number().min(1).required(),
  productId: yup.string().required(),
  billId: yup.string().required()
});

export const validateCreateOrder = async(newOrder: NewOrder) => {
  await schema.validate(newOrder);
};
