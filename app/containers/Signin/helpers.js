import { validate } from 'utils/validate';

const validationPropsByField = {
  signIn: {
    email: { type: 'emailInput' },
  },
  signUp: {
    email: { type: 'emailInput' },
    password: { type: 'passwordInput' },
    verifyPassword: { type: 'verifyInput' },
  },
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
