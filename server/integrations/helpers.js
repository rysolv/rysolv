const fetch = require('node-fetch');

const FETCH = async url => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const result = await fetch(url, requestOptions);
  const data = await result.json();
  return data;
};

module.exports = {
  FETCH,
};
