import { validate } from 'utils/validate';

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

export const getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question = urlParams.get('question');
  return Number(question);
};

export const optionDictionary = {
  desired_role: {
    option: 'multipleButton',
  },
  experience: {
    option: 'multipleButton',
  },
  personal_link: {
    option: 'singleInput',
    placeholder: 'https://mypersonalwebsite.com',
    type: 'url',
  },
  preferred_languages: {
    option: 'autocomplete',
    placeholder: 'Languages',
  },
  preferred_location: {
    option: 'multipleButton',
  },
  resume: {
    option: 'dragAndDrop',
  },
  target_salary: {
    option: 'singleButton',
  },
  timeline: {
    option: 'multipleButton',
  },
  us_citizen: {
    option: 'singleButton',
  },
};

const validationPropsByField = {
  personalLink: { type: 'linkInput' },
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
  const { value } = values[field];
  return validate({
    required,
    value,
    ...validationPropsByField[field],
  });
};
