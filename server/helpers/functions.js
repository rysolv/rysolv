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

const isUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
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
    throw new CustomError(`Payout url does not match selected payout method`);

  if (!payoutUrl.length) throw new CustomError(`Must enter valid payout url`);
};

module.exports = {
  arrayCheck,
  CustomError,
  errorLogger,
  isUrl,
  validatePayoutUrl,
};
