const fetch = require('node-fetch');
const qs = require('qs');

/* eslint-disable func-names */

/**
 * @description Parses the JSON returned by a network request
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
const parseJSON = function(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.headers.get('Content-Type').match('application/json')) {
    return response.json();
  }
  if (response.headers.get('Content-Type').match('application/pdf')) {
    return response;
  }
  return response.text();
};

/**
 * @description Checks the parsed response for an API error located within the result
 * object of the response
 * @param {object} response Parsed response
 * @return {object | error} If there is no error, the parsed response will be returned
 */
const checkAPIerror = function(response) {
  const { reasons = null, result, ...restData } = response;
  if (result) {
    const { status } = result;
    if (status === 'Error') {
      const error = new Error('apiError');
      error.details = { reasons, ...result };
      error.requestData = restData;
      throw error;
    }
  }
  return response;
};

/**
 * @description Checks if a network request came back fine, and throws an error if not
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error('statusError');
  error.response = response;
  throw error;
};

// BASE HEADER CONFIGURATION
const baseHeaders = {
  'cache-control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded',
};

/**
 * @description Requests a URL, returning a promise
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           The response data
 */
const request = function(url, options) {
  const optionsWithCreds = { credentials: 'include', ...options };
  return fetch(url, optionsWithCreds)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkAPIerror);
};

/**
 * @description Makes a DELETE request to the specified url
 * @param  {string} url       The URL we want to request
 * @return {object}           The response data
 */
const del = function(url, headers = {}) {
  return request(url, {
    headers: {
      ...baseHeaders,
      ...headers,
    },
    method: 'DELETE',
  });
};

/**
 * @description Makes a GET request to the specified url
 *
 * @param  {string} url       The URL we want to request
 *
 * @return {object}           The response data
 */
const get = function(url, headers = {}) {
  return request(url, {
    headers: {
      ...baseHeaders,
      ...headers,
    },
    method: 'GET',
  });
};

/**
 * @description Makes a POST request to the specified url
 * @param  {string} url       The URL we want to request
 * @param  {object} payload   The data to set as the POST body
 * @return {object}           The response data
 */
const post = function(url, payload, headers = {}) {
  return request(url, {
    body: qs.stringify(payload),
    headers: {
      ...baseHeaders,
      ...headers,
    },
    method: 'POST',
  });
};

/**
 * @description Makes a PUT request to the specified url
 * @param  {string} url       The URL we want to request
 * @param  {object} payload   The data to set as the PUT body
 * @return {object}           The response data
 */
const put = function(url, payload, headers = {}) {
  return request(url, {
    body: qs.stringify(payload),
    headers: {
      ...baseHeaders,
      ...headers,
    },
    method: 'PUT',
  });
};

/**
 * @description Request function that will retry a failed request for X number of times.
 * @param {func} method Request method to use
 * @param {object} headers Request headers to send
 * @param {object} payload Payload for post requests
 * @param {string} url URL to make the request to
 * @param {number} retry Number of times to retry. Default is 3
 */
const fetchRetry = async function(
  method,
  { headers = {}, payload, url },
  retry = 3,
) {
  const fetchArgs = payload ? [url, payload, headers] : [url, headers];
  try {
    return await method(...fetchArgs);
  } catch (error) {
    if (retry === 1) {
      throw error;
    } else {
      return fetchRetry(method, { headers, payload, url }, retry - 1);
    }
  }
};

module.exports = {
  checkAPIerror, // Temporarily exporting to handle errors from mock data
  del,
  fetchRetry,
  get,
  post,
  put,
  request,
};
