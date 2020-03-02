import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

const isBlank = value =>
  isUndefined(value) ||
  isNull(value) ||
  value.length === 0 ||
  isEmptyString(value);

const isEmptyString = str => {
  if (typeof str === 'string') {
    return /^\s*$/.test(str);
  }
  return false;
};

const validateUrl = value => {
  const organization = value.split('/')[1];
  const url = value.split('/')[0].split('.');
  const subDomain = url[0];
  const domain = url[1];
  const topLevelDomain = url[2];
  if (
    subDomain !== 'www' ||
    domain !== 'github' ||
    topLevelDomain !== 'com' ||
    typeof organization !== 'string' ||
    organization.length === 0
  ) {
    return {
      error: 'invalidImport',
      message: 'Invalid GitHub URL',
    };
  }
  return false;
};

export const validationDictionary = { urlInput: validateUrl };

export const validate = ({ required, type, value, ...validationProps }) => {
  if (required && isBlank(value)) {
    return {
      error: 'isRequired',
      message: 'Required field',
    };
  }
  if (!Array.isArray(type)) {
    const validationFunction = validationDictionary[type];
    return validationFunction(value, validationProps);
  }
  // If multiple validationTypes, return the first error encountered or false if no errors
  return type.reduce((acc, validationType) => {
    if (acc) return acc;
    const validationFunction = validationDictionary[validationType];
    return validationFunction(value, validationProps);
  }, false);
};
