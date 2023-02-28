import * as yup from 'yup';

export const nameValidator = yup
  .string()
  .matches(
    /^[\p{L} -]+$/u,
    'Name must contain only letters, spaces and hyphens'
  )
  .label('Name');
export const firstNameValidator = nameValidator.label('First name');
export const lastNameValidator = nameValidator.label('Last name');

export const emailValidator = yup.string().email().label('Email');
export const passwordValidator = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character'
  )
  .label('Password');

export const birthDateValidator = yup
  .date()
  .max(new Date(), 'Birth date must be in the past')
  .label('Birth date');

export const idValidator = yup.number().min(1).label('ID');
