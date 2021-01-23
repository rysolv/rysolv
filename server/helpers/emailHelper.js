const fetch = require('node-fetch');

const { errorLogger } = require('./functions');

const production = process.env.NODE_ENV === 'production';
const api = production ? process.env.EMAIL_API : process.env.EMAIL_API_LOCAL;

const sendEmail = async ({ body, path }) => {
  const requestOptions = {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };

  try {
    const url = `${api}${path}`;
    const res = await fetch(url, requestOptions);
    const { error } = await res.json();

    if (res.status !== 200) {
      throw new Error(error.message);
    }
  } catch (error) {
    errorLogger(error);
  }
};

module.exports = { sendEmail };
