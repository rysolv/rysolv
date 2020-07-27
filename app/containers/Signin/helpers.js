import { validate } from 'utils/validate';

const validationPropsByField = {
  email: { type: 'emailInput' },
  password: { type: 'passwordInput' },
  verifyPassword: { type: 'verifyInput' },
};

export const validateFields = ({ values, verifyField }) =>
  Object.keys(values).reduce(
    (acc, field) => {
      const validatedValue =
        validateOneField({ field, values, verifyField }) || '';
      if (validatedValue) {
        acc.isValidated = false;
      }
      acc.validationErrors[field] = validatedValue;
      return acc;
    },
    { isValidated: true, validationErrors: {} },
  );

export const validateOneField = ({ field, values, verifyField }) => {
  const { value } = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[field],
    ...verifyField,
  });
};
