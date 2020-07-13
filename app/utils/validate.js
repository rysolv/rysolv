import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

export const isBlank = value =>
  isUndefined(value) || isNull(value) || isEmptyString(value);

const isEmptyString = str => {
  if (typeof str === 'string') {
    return /^\s*$/.test(str);
  }
  return false;
};

export const validateIssueUrl = value => {
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
    message: 'Invalid GitHub Issue',
  };
};

export const validateOrganizationUrl = value => {
  const url = value.split('/');
  const containsHttps = url.includes('https:');
  if (!containsHttps) {
    url.unshift('https:');
  } else {
    url.splice(1, 1);
  }

  const githubPosition = Math.max(
    url.indexOf('github.com'),
    url.indexOf('www.github.com'),
  );

  if (githubPosition > -1 && url.length >= 3 && url.length <= 5) {
    if (url.length > 3) {
      const repo = url[githubPosition + 2];
      const organization = url[githubPosition + 1];
      return {
        error: false,
        validatedUrl: `https://github.com/${organization}/${repo}`,
      };
    }
    const organization = url[githubPosition + 1];
    return {
      error: false,
      validatedUrl: `https://github.com/${organization}`,
    };
  }
  return {
    error: 'invalidImport',
    message: 'Invalid GitHub Organization',
  };
};

export const validationDictionary = { urlInput: validateIssueUrl };

export const validate = ({ required, type, value, ...validationProps }) => {
  if (required && isBlank(value)) {
    return {
      error: 'isRequired',
      message: 'Required field',
    };
  }
  if (!Array.isArray(type)) {
    const validationFunction = [type];
    return validationFunction(value, validationProps);
  }
  // If multiple validationTypes, return the first error encountered or false if no errors
  return type.reduce((acc, validationType) => {
    if (acc) return acc;
    const validationFunction = validationDictionary[validationType];
    return validationFunction(value, validationProps);
  }, false);
};
