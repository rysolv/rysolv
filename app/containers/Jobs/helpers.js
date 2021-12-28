import { validate } from 'utils/validate';

import { additionalInputDictionary } from './constants';

export const convertFileToDataUrl = async file => {
  const { type } = file;
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  if (!dataUrl) return 'data:';
  const base64Data = dataUrl.split(',')[1];
  return `data:${type};base64,${base64Data}`;
};

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
  personal_link: {
    option: 'singleInput',
    placeholder: 'https://mypersonalwebsite.com',
    type: 'url',
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
  us_citizen: {
    option: 'singleButton',
  },
};

const validationPropsByField = {
  personalLink: { type: 'linkInput' },
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
  const isFieldRequired = !(values[additionalInputDictionary[field]] === 'Yes');
  const value = values[field];
  return validate({
    additionalInputField: !!values[additionalInputDictionary[field]],
    required: isFieldRequired || required,
    value,
    ...validationPropsByField[field],
  });
};
