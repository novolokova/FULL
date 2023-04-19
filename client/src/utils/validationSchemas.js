import * as Yup from 'yup';

export const NAME_SCHEMA = Yup.string()
  .trim()
  .matches(/^[A-Z]/, 'Must be first capital letter')
  .min(2, 'Must be more 2 letters')
  .max(16, 'Must be less 16 letters')
  .matches(/[a-z]{3,15}$/, 'Must be only one capital letter or latin letters')
  .required('Required field');

export const CONTENT_SCHEMA = Yup.object({
  content: Yup.string()
    .trim()
    .min(10, 'Must be more 10 letters')
    .max(70, 'Must be less 70 letters')
    .required('Required!'),
});

export const GROUP_SCHEMA = Yup.object({
  name: NAME_SCHEMA,
});

export const UPDATE_GROUP_SCHEMA = Yup.object({
  name: NAME_SCHEMA,
  descriptition: CONTENT_SCHEMA
});

export const EMAIL_SCHEMA = Yup.string()
  .trim()
  .email()
  .required('Required field');

export const PASS_SCHEMA = Yup.string()
  .min(6, 'Must be more 8 symbols')
  .max(15, 'Must be less 15 symbols')
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
    'Password is too simple EXSAMPLE: gr3at@3wdsG '
  )
  .required('Required field');

export const UPDATE_SCHEMA = Yup.object({
  firstName: NAME_SCHEMA,
  lastName: NAME_SCHEMA,
});

export const USER_FORM_SCHEMA = Yup.object({
  firstName: NAME_SCHEMA,
  lastName: NAME_SCHEMA,
  email: EMAIL_SCHEMA,
  password: PASS_SCHEMA,
});
