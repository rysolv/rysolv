import { validate } from 'utils/validate';

const validationPropsByField = {
  body: { maxLength: 500, type: 'stringInput' },
  email: { type: 'emailInput' },
  name: { type: 'stringInput' },
};

export const validateFields = ({ values }) =>
  Object.keys(values).reduce(
    (acc, field) => {
      const validatedValue = validateOneField({ field, values }) || '';
      if (validatedValue) {
        acc.isValidated = false;
      }
      acc.validationErrors[field] = validatedValue;
      return acc;
    },
    { isValidated: true, validationErrors: {} },
  );

export const validateOneField = ({ field, values }) => {
  const value = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[field],
  });
};
