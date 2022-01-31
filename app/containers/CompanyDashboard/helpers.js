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
  interview_process: {
    option: 'stepperInput',
  },
  is_active: {
    option: 'toggle',
  },
  location: {
    option: 'locationAutocomplete',
  },
  logo: {
    option: 'fileInput',
  },
  name: {
    option: 'input',
    placeholder: 'Company name',
  },
  post_to_job_board: {
    option: 'toggle',
  },
  role: {
    option: 'autocomplete',
  },
  salary: {
    option: 'autocomplete',
  },
  size: {
    option: 'autocomplete',
  },
  skills: {
    option: 'radioGroup',
    type: 'skills',
  },
  timezone: {
    option: 'autocomplete',
  },
  title: {
    option: 'input',
  },
  type: {
    option: 'autocomplete',
  },
  website: {
    option: 'input',
    placeholder: 'Company website',
  },
};

const validationPropsByField = {
  interviewProcess: { type: 'interviewProcessInput' },
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
  const value = values[field];
  return validate({
    required: true,
    value,
    ...validationPropsByField[field],
  });
};
