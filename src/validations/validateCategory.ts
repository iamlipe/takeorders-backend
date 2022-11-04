import * as yup from 'yup';
import { NewCategory } from '../interfaces/Category';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
});

export const validateCategory = async({ name }: NewCategory) => {
  await schema.validate({ name });
};
