import { validate } from 'utils/validate';

const errorDictionary = {
  url: 'urlInput',
};

export const validateInputs = ({ inputs }) => {
  const fields = Object.keys(inputs);
  return fields.reduce((acc, field) => {
    const validationType = errorDictionary[field];
    const value = inputs[field];
    if (validationType) {
      const validationResult = validate({
        required: true,
        type: validationType,
        value,
      });
      if (validationResult) {
        acc[field] = validationResult.message;
      } else {
        acc[field] = false;
      }
    }
    return acc;
  }, {});
};
