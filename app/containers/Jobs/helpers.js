import { validate } from 'utils/validate';

import { additionalInputDictionary } from './constants';

// @TODO: Locations
// remove is_remote
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
  is_remote: {
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
    option: 'singleButton',
  },
  timezone: {
    option: 'autocomplete',
  },
  us_citizen: {
    option: 'singleButton',
  },
};

const validationPropsByField = {
  preferredLocation: { type: 'positionLocationInput' },
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
  const isFieldRequired = additionalInputDictionary[field]
    ? !(values[additionalInputDictionary[field]] === 'Yes')
    : required;
  const value = values[field];
  return validate({
    additionalInputField: !!values[additionalInputDictionary[field]],
    required: isFieldRequired,
    value,
    ...validationPropsByField[field],
  });
};
