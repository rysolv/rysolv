import { validate } from 'utils/validate';

const errorDictionary = {
  importUrl: 'urlInput',
};

export const validateInputs = ({ data }) => {
  const fields = Object.keys(data);
  return fields.reduce((acc, field) => {
    const validationType = errorDictionary[field];
    const { value } = data[field];
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
