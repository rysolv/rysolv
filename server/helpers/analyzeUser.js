const fetch = require('node-fetch');

const { errorLogger } = require('./functions');

const production = process.env.NODE_ENV === 'production';
const api = production
  ? process.env.ANALYTICS_API
  : process.env.ANALYTICS_API_LOCAL;

const analyzeUser = async ({ userId }) => {
  const requestOptions = {
    body: JSON.stringify({ userId }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };

  try {
    const url = `${api}/user/analyze`;
    const res = await fetch(url, requestOptions);
    const { error } = await res.json();

    if (res.status !== 200) {
      throw new Error(error.message);
    }
  } catch (error) {
    errorLogger(error);
  }
};

module.exports = { analyzeUser };
