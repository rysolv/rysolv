import { validate } from 'utils/validate';

import { additionalInputDictionary } from './constants';

export const filterCandidates = (candidates, filterParams) => {
  const {
    location: locationFilter,
    salary: salaryFilter,
    step: stepFilter,
    type: typeFilter,
  } = filterParams;

  const filteredCandidates = candidates.filter(
    ({ isSaved, location, salary, type }) => {
      if (!isSaved && stepFilter === 'Shortlisted') return false;
      if (location !== locationFilter && !!locationFilter) return false;
      if (salary >= salaryFilter) return false;
      if (type !== typeFilter && !!typeFilter) return false;
      return true;
    },
  );
  return filteredCandidates;
};

export const optionDictionary = {
  description: {
    option: 'textarea',
  },
  experience: {
    option: 'autocomplete',
  },
  hiring_timeframe: {
    option: 'autocomplete',
  },
  is_remote: {
    option: 'autocomplete',
  },
  location: {
    option: 'locationAutocomplete',
  },
  role: {
    option: 'autocomplete',
  },
  salary: {
    option: 'autocomplete',
  },
  skills: {
    option: 'radioGroup',
    type: 'skills',
  },
  title: {
    option: 'input',
  },
  type: {
    option: 'autocomplete',
  },
};

const validationPropsByField = {
  location: { type: 'positionLocationInput' },
  title: { type: 'stringInput' },
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
  const required = !(
    field === 'location' && values[additionalInputDictionary[field]] === 'Yes'
  );
  const value = values[field];
  return validate({
    additionalInputField: !!values[additionalInputDictionary[field]],
    required,
    value,
    ...validationPropsByField[field],
  });
};
