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

export const validateUrl = value => {
  const url = value.split('/');
  const issueNumber = url[url.length - 1];
  const validIssueNumber = !Number.isNaN(parseInt(issueNumber, 10) + 1);
  const validIssues = url[url.length - 2] === 'issues';
  const repo = url[url.length - 3];
  const organization = url[url.length - 4];
  const containsGithub =
    url[url.length - 5] === 'github.com' ||
    url[url.length - 5] === 'www.github.com' ||
    url[url.length - 5] === 'api.github.com';
  if (validIssueNumber && validIssues && containsGithub) {
    return {
      error: false,
      validatedUrl: `https://github.com/${organization}/${repo}/issues/${issueNumber}`,
    };
  }
  return {
    error: 'invalidImport',
    message: 'Invalid GitHub URL',
  };
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
