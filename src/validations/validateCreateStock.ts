import * as yup from 'yup';
import { NewStock } from '../interfaces/Stock';

const schema = yup.object().shape({
  userId: yup.string().required(),
});

export const validateCreateStock = async({ userId }: NewStock) => {
  await schema.validate({ userId });
};
