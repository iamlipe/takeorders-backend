import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  phone: yup.string().matches(
    /^\(([0-9]{2})\) ([0-9]{4,5})-([0-9]{4})$/,
    'Invalid phone number',
  ),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});