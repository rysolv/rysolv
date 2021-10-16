import { validate } from 'utils/validate';

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
  location: {
    option: 'locationAutocomplete',
  },
  role: {
    option: 'input',
  },
  salary: {
    option: 'autocomplete',
  },
  skills: {
    option: 'radioGroup',
    type: 'skills',
  },
  type: {
    option: 'autocomplete',
  },
};

const validationPropsByField = {
  company: { type: 'stringInput' },
  email: { type: 'emailInput' },
  name: { type: 'stringInput' },
  role: { type: 'stringInput' },
  url: { type: 'linkInput' },
};

export const validateOneField = ({ field, values }) => {
  const value = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[field],
  });
};
