const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

class CustomError extends Error {
  constructor(message) {
    super();
    this.alert = message;
  }
}

const arrayCheck = result => {
  if (Array.isArray(result) && result.length > 1) {
    return result;
  }
  if (Array.isArray(result) && result.length === 1) {
    return result[0];
  }
  return null;
};

const errorLogger = e => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(e);
  } else {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

const formatToCamelCase = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

const generatePositionLevel = levels => {
  const { beginner, intermediate, expert } = levels || {};
  if (beginner) return 1;
  if (intermediate) return 2;
  if (expert) return 3;
  // Default to intermediate
  return 2;
};

const generateSizeInteger = ({ size }) => {
  const sizeDictionary = {
    '1 - 10': 10,
    '11 - 50': 50,
    '51 - 250': 250,
    '251 +': 1000,
  };
  return sizeDictionary[size];
};

const generateSizeString = ({ size }) => {
  const sizeDictionary = {
    10: '1 - 10',
    50: '11 - 50',
    250: '51 - 250',
    1000: '251 +',
  };
  return sizeDictionary[size];
};

const isUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

const matchLanguages = ({ userLanguages, positionLanguages }) => {
  // Takes two arrays ex: [{name: 'JavaScript', level: 3}, {name: ruby...}]
  // Returns an array of up to 3 languages. Prioritize matching position
  // languages, followed by user skill level.
  const objSort = obj =>
    obj.sort((a, b) => {
      if (a.level < b.level) return 1;
      if (a.level > b.level) return -1;
      return 0;
    });
  const positionLanguageArray = objSort(positionLanguages).map(el => el.name);
  const userLanguageArray = objSort(userLanguages).map(el => el.name);

  const languages = [];

  positionLanguageArray.forEach(el => {
    if (userLanguageArray.includes(el) && languages.length <= 3) {
      const i = userLanguageArray.indexOf(el);
      if (i !== -1) userLanguageArray.splice(i, 1);
      languages.push(el);
    }
  });

  while (userLanguageArray.length > 0 && languages.length < 3)
    languages.push(userLanguageArray.shift());
  return languages;
};

const validatePayoutUrl = ({ payoutMethod, payoutUrl }) => {
  const payoutMethodDictionary = {
    'Github Sponsors': 'github',
    'Open Collective': 'opencollective',
    Paypal: 'paypal',
  };
  const formattedUrl = new URL(payoutUrl);
  const { host } = formattedUrl;
  const urlArray = host.split('.');

  let domain = '';
  if (urlArray.length === 2) [domain] = urlArray;
  if (urlArray.length === 3) [, domain] = urlArray;
  const selectedDomain = payoutMethodDictionary[payoutMethod];

  if (domain !== selectedDomain)
    throw new CustomError(`Payout url does not match selected payout method.`);

  if (!payoutUrl.length) throw new CustomError(`Must enter valid payout url.`);
};

module.exports = {
  arrayCheck,
  CustomError,
  errorLogger,
  formatToCamelCase,
  generatePositionLevel,
  generateSizeInteger,
  generateSizeString,
  isUrl,
  matchLanguages,
  validatePayoutUrl,
};
