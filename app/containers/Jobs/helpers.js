import { validate } from 'utils/validate';

export const optionDictionary = {
  desired_role: {
    option: 'multipleButton',
  },
  experience: {
    option: 'multipleButton',
  },
  is_active: {
    option: 'singleButton',
  },
  preferred_location: {
    option: 'locationAutocomplete',
  },
  resume: {
    option: 'dragAndDrop',
  },
  skills: {
    option: 'radioGroup',
    type: 'skills',
  },
  target_salary: {
    option: 'singleButton',
  },
  timezone: {
    option: 'autocomplete',
  },
  type: {
    option: 'multipleButton',
  },
  us_citizen: {
    option: 'singleButton',
  },
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
  });
};
