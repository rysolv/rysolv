const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' });

const arrayCheck = result => {
  if (Array.isArray(result) && result.length > 1) {
    return result;
  }
  if (Array.isArray(result) && result.length === 1) {
    return result[0];
  }
  return null;
};

const errorLogger = e => Sentry.captureException(e);

const isUrl = string => {
  let url;
  try {
    url = new URL(string);
  } catch {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

module.exports = {
  arrayCheck,
  errorLogger,
  isUrl,
};
