/* eslint-disable prefer-destructuring */
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
    return `Amount must be greater than $0.99`;
  }
  return false;
};

const validateGithubLink = value => {
  const formattedValue = value.replace(/(^\w+:|^)\/\//, '');
  const linkArray = formattedValue.split('/');
  const isLinkValid =
    linkArray.length === 2 &&
    (linkArray[0] === 'www.github.com' || linkArray[0] === 'github.com');
  if (!isLinkValid) {
    return `Must enter valid Github link ex. https://github.com/bob123`;
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

const validateLink = value => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  const isLinkValid = pattern.test(value);
  if (!isLinkValid) {
    return `Must enter valid link`;
  }
  return false;
};

const validatePayoutUrl = (value, { payoutMethod }) => {
  try {
    const payoutMethodDictionary = {
      'Github Sponsors': 'github',
      'Open Collective': 'opencollective',
      Paypal: 'paypal',
    };
    const formattedUrl = new URL(value);
    const { host } = formattedUrl;
    const urlArray = host.split('.');

    let domain = '';
    if (urlArray.length === 2) domain = urlArray[0];
    if (urlArray.length === 3) domain = urlArray[1];
    const selectedDomain = payoutMethodDictionary[payoutMethod];

    if (domain !== selectedDomain) {
      return `Link does not match selected payout method`;
    }

    return false;
  } catch {
    return `Must enter valid link`;
  }
};

const validatePassword = value => {
  const containsLowercase = /(?=.*[a-z])/.test(value);
  const containsNumber = /(?=.*\d)/.test(value);
  const containsSymbol = /(?=.*[^\w\d\s])/.test(value);
  const containsUppercase = /(?=.*[A-Z])/.test(value);
  const greaterThanEight = value.length >= 8;

  if (!containsLowercase) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!containsNumber) {
    return 'Password must contain at least one number';
  }

  if (!containsSymbol) {
    return 'Password must contain at least one symbol';
  }

  if (!containsUppercase) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!greaterThanEight) {
    return 'Password must be at least 8 characters long';
  }
  return false;
};

export const validateRepoUrl = value => {
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
    message: 'Invalid GitHub Repo',
  };
};

const validateStackoverflowLink = value => {
  const formattedValue = value.replace(/(^\w+:|^)\/\//, '');
  const linkArray = formattedValue.split('/');
  const isLinkValid =
    linkArray.length === 4 &&
    (linkArray[0] === 'www.stackoverflow.com' ||
      linkArray[0] === 'stackoverflow.com') &&
    linkArray[1] === 'users';
  if (!isLinkValid) {
    return `Must enter valid Stackoverflow link ex. https://stackoverflow.com/users/12345`;
  }
  return false;
};

const validateString = (value, { maxLength = 60 }) => {
  if (typeof value !== 'string') {
    return 'Invalid value';
  }
  if (value.length > maxLength) {
    return `Must be less than ${maxLength + 1} characters`;
  }
  return false;
};

const validateUsername = (value, { maxLength = 60 }) => {
  const isNotAlphaNumeric = /[^a-zA-Z0-9-_]/.test(value);
  if (isNotAlphaNumeric) {
    return `Username must only contain alphanumeric characters, hyphens, and underscores`;
  }
  return validateString(value, { maxLength });
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
  githubLinkInput: validateGithubLink,
  linkInput: validateLink,
  passwordInput: validatePassword,
  payoutUrlInput: validatePayoutUrl,
  stackoverflowLinkInput: validateStackoverflowLink,
  stringInput: validateString,
  usernameInput: validateUsername,
  verifyInput: validateVerifyInput,
};

export const validate = ({ required, type, value, ...validationProps }) => {
  if (required && isBlank(value)) {
    return 'Required field';
  }
  if (!required && isBlank(value)) {
    return false;
  }
  const validationFunction = validationDictionary[type];
  if (validationFunction) {
    return validationFunction(value, validationProps);
  }
};
