import { validate } from 'utils/validate';

const validationPropsByField = {
  firstName: { type: 'stringInput' },
  lastName: { type: 'stringInput' },
};

export const validateOneField = ({ field, values }) => {
  const value = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[field],
  });
};
