import { validate } from 'utils/validate';

export const optionDictionary = {
  description: {
    option: 'textarea',
  },
  location: {
    option: 'locationAutocomplete',
  },
  name: {
    option: 'input',
    placeholder: 'Company name',
  },
  size: {
    option: 'autocomplete',
  },
  website: {
    option: 'input',
    placeholder: 'Company website',
  },
};

const validationPropsByField = {
  website: { type: 'linkInput' },
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
