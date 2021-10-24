import { validate } from 'utils/validate';

export const optionDictionary = {
  description: {
    option: 'textarea',
  },
  location: {
    option: 'autocomplete',
  },
  name: {
    option: 'singleInput',
    placeholder: 'Company name',
  },
  size: {
    option: 'singleButton',
  },
  website: {
    option: 'singleInput',
    placeholder: 'Company website',
  },
};

const validationPropsByField = {
  website: { type: 'linkInput' },
};

export const validateFields = ({ questions, values }) =>
  Object.keys(values).reduce(
    (acc, field) => {
      const [{ required }] = questions.filter(
        question => field === question.id,
      );
      const validatedValue =
        validateOneField({ field, required, values }) || '';
      if (validatedValue) {
        acc.isValidated = false;
      }
      acc.validationErrors[field] = validatedValue;
      return acc;
    },
    { isValidated: true, validationErrors: {} },
  );

export const validateOneField = ({ field, required, values }) => {
  const value = values[field];
  return validate({
    required,
    value,
    ...validationPropsByField[field],
  });
};
