import 'whatwg-fetch';

/**
 * Parses the Response returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed Response from the request
 */
function parseResponse(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.status === 401) {
    return response.text();
  }
  if (response.headers.get('Content-Type').match('application/csv')) {
    return response.blob();
  }
  if (response.headers.get('Content-Type').match('application/json')) {
    return response.json();
  }
  return response.text();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    window.location.pathname = 'authenticate';
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {}) {
  const optionsWithCreds = { ...options, credentials: 'include' };
  return fetch(url, optionsWithCreds)
    .then(checkStatus)
    .then(parseResponse);
}

const headers = new Headers({ 'Content-Type': 'application/json' });

/**
 * Makes a DELETE request to the specified url
 *
 * @param  {string} url       The URL we want to request
 *
 * @return {object}           The response data
 */
export function del(url) {
  return request(url, {
    headers,
    method: 'DELETE',
  });
}

/**
 * Makes a GET request to the specified url
 *
 * @param  {string} url       The URL we want to request
 *
 * @return {object}           The response data
 */
export function get(url, headersObject) {
  // Will refactor way we send headers in future PR
  const headersToSend = headersObject
    ? new Headers({ ...headersObject, 'Content-Type': 'application/json' })
    : headers;
  return request(url, {
    headers: headersToSend,
    method: 'GET',
  });
}

/**
 * Makes a POST request to the specified url
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} payload   The data to set as the POST body
 *
 * @return {object}           The response data
 */
export function post(url, payload, type) {
  return request(
    url,
    {
      body: JSON.stringify(payload),
      headers,
      method: 'POST',
    },
    type,
  );
}
