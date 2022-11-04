import * as yup from 'yup';
import { NewBill } from '../interfaces/Bill';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email(),
  phone: yup.string().matches(
    /^\(([0-9]{2})\) ([0-9]{4,5})-([0-9]{4})$/,
    'Invalid phone number',
  ),
  image: yup.string(),
  status: yup.boolean(),
  userId: yup.string().required()
});

export const validateBill = async(newBill: NewBill) => {
  await schema.validate(newBill);
};
