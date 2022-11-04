import * as yup from 'yup';
import { NewSpent } from '../interfaces/Spent';

const schema = yup.object().shape({
  userId: yup.string().required(),
});

export const validateSpent = async({ userId }: NewSpent) => {
  await schema.validate({ userId });
};
