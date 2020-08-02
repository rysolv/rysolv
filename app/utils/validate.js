/* eslint-disable consistent-return, no-useless-escape */
import capitalize from 'lodash/capitalize';
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

export const validateEmail = value => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = re.test(String(value).toLowerCase());
  if (!isValidEmail) {
    return `Must enter valid email address`;
  }
  return false;
};

export const validateFundValue = value => {
  if (value < 1) {
    return `Funding must be greater than $0.99`;
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

const validatePassword = value => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=])(?=.{8,})/;
  const isValidPassword = re.test(value);
  if (!isValidPassword) {
    return 'Password must contain one lowercase letter, one uppercase letter, one number, one special character and be at least 8 characters long';
  }
  return false;
};

const validateString = value => {
  if (typeof value !== 'string') {
    return 'Invalid value';
  }
  return false;
};

const validateVerifyInput = (value, { field, verifyValue }) => {
  if (value !== verifyValue) {
    return `${capitalize(field)}s do not match`;
  }
  return false;
};

export const validationDictionary = {
  emailInput: validateEmail,
  fundInput: validateFundValue,
  passwordInput: validatePassword,
  stringInput: validateString,
  verifyInput: validateVerifyInput,
};

export const validate = ({ required, type, value, ...validationProps }) => {
  if (required && isBlank(value)) {
    return 'Required field';
  }
  const validationFunction = validationDictionary[type];
  if (validationFunction) {
    return validationFunction(value, validationProps);
  }
};
