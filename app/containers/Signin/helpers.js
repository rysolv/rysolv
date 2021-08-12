import { validate } from 'utils/validate';

const validationPropsByField = {
  resetPassword: {
    password: { type: 'passwordInput' },
    verifyPassword: { type: 'verifyInput' },
  },
  sendLink: {
    email: { type: 'emailInput' },
  },
  signIn: {
    email: { type: 'emailInput' },
  },
  signUp: {
    email: { type: 'emailInput' },
    firstName: { maxLength: 30, type: 'stringInput' },
    lastName: { maxLength: 30, type: 'stringInput' },
    password: { type: 'passwordInput' },
    username: { maxLength: 20, type: 'usernameInput' },
    verifyPassword: { type: 'verifyInput' },
  },
  verify: {},
};

export const validateFields = ({ form, values, verifyField }) =>
  Object.keys(values).reduce(
    (acc, field) => {
      const validatedValue =
        validateOneField({ field, form, values, verifyField }) || '';
      if (validatedValue) {
        acc.isValidated = false;
      }
      acc.validationErrors[field] = validatedValue;
      return acc;
    },
    { isValidated: true, validationErrors: {} },
  );

export const validateOneField = ({ field, form, values, verifyField }) => {
  const { value } = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[form][field],
    ...verifyField,
  });
};
