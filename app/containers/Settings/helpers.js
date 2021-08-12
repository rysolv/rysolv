import { validate } from 'utils/validate';

const validationPropsByField = {
  depositValue: { required: true, type: 'fundInput' },
  email: { required: true, type: 'emailInput' },
  firstName: { maxLength: 30, required: true, type: 'stringInput' },
  githubLink: { type: 'githubLinkInput' },
  lastName: { maxLength: 30, required: true, type: 'stringInput' },
  personalLink: { type: 'linkInput' },
  stackoverflowLink: { type: 'stackoverflowLinkInput' },
  transferValue: { required: true, type: 'fundInput' },
  username: { maxLength: 20, required: true, type: 'stringInput' },
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
    value,
    ...validationPropsByField[field],
  });
};
