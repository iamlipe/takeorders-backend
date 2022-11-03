import * as yup from 'yup';
import { UpdateOrder } from '../interfaces/Order';

const schema = yup.object().shape({
  id: yup.string().required(),
  updateOrder: yup.object().shape({
    quantity: yup.number().min(1).required(),
    productId: yup.string().required(),
    billId: yup.string().required(),
    createdAt: yup.date().required()
  })
});

export const validateUpdateOrder = async(updateOrder: UpdateOrder) => {
  await schema.validate(updateOrder);
};
