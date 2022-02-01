import { validate } from 'utils/validate';

export const optionDictionary = {
  desired_role: {
    option: 'autocomplete',
  },
  experience: {
    option: 'autocomplete',
  },
  is_active: {
    option: 'autocomplete',
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
    option: 'autocomplete',
  },
  timezone: {
    option: 'autocomplete',
  },
  type: {
    option: 'autocomplete',
  },
  us_citizen: {
    option: 'autocomplete',
  },
};

const validationPropsByField = {
  githubLink: { type: 'githubLinkInput' },
  personalLink: { type: 'linkInput' },
  stackoverflowLink: { type: 'stackoverflowLinkInput' },
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
  const isRequired = field === 'skills';
  return validate({
    required: isRequired,
    value,
    ...validationPropsByField[field],
  });
};
