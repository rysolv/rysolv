import { validate } from 'utils/validate';

const validationPropsByField = {
  email: { type: 'emailInput' },
};

export const validateOneField = ({ field, values }) => {
  const value = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[field],
  });
};
