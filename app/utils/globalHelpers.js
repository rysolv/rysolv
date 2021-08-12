import { useEffect, useRef } from 'react';

export const formatDollarAmount = (value, noDecimals = false) => {
  const numOfDecimals = noDecimals ? 0 : 2;
  const valueWithDecimals = parseFloat(value).toFixed(numOfDecimals);

  if (valueWithDecimals > 5) {
    return `$${valueWithDecimals
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  return `$${valueWithDecimals}`;
};

export const formatPaypalTotal = value =>
  (Number(value) * 1.03 + 0.3).toFixed(2);

export const formatUrlLinks = value => {
  const { githubLink, personalLink, stackoverflowLink } = value;
  if (githubLink) {
    const formattedLink = githubLink.split('/').pop();
    return formattedLink;
  }
  if (personalLink) {
    const formattedLink = personalLink
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
      .split('/')[0];
    return formattedLink;
  }
  if (stackoverflowLink) {
    const formattedLink = stackoverflowLink.split('/').pop();
    return formattedLink;
  }
  return value;
};

export const formatPercentage = value => `${(value * 100).toFixed(0)}%`;

export const formatWordString = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const getCookie = cookie => {
  // eslint-disable-next-line no-useless-escape
  const regexStr = new RegExp(
    `(?:(?:^|.*;\\s*)${cookie}\\s*\\=\\s*([^;]*).*$)|^.*$`,
    'g',
  );
  const cookieValue = document.cookie.replace(regexStr, '$1');
  if (cookieValue) return cookieValue;
  return '';
};

export const getPaymentMethod = url => {
  const hostDictionary = {
    github: 'Github Sponsors',
    opencollective: 'Open Collective',
    paypal: 'Paypal',
  };
  if (url) {
    const { host } = new URL(url);
    const urlArray = host.split('.');

    let domain = '';
    if (urlArray.length === 2) [domain] = urlArray;
    if (urlArray.length === 3) [, domain] = urlArray;
    return hostDictionary[domain];
  }
  return 'Payment Methods';
};

export const handleZipChange = (event, newZip, setZipValue) => {
  const formattedZip = newZip.replace(/[^0-9]/g, '');
  setZipValue(formattedZip);
};

export const navHelper = (e, handleNav, route) => {
  if (!e.ctrlKey) {
    e.preventDefault();
    handleNav(route);
  }
};

export const removeCookie = cookie => {
  document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const setCookie = (name, value, options = {}) => {
  const baseCookie = `${name}=${JSON.stringify(value)}`;
  const cookieWithOptions = Object.keys(options).reduce((acc, option) => {
    const cookieOption = `; ${option}=${options[option]}`;
    return acc + cookieOption;
  }, baseCookie);
  document.cookie = `${cookieWithOptions};`;
};

export const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

export const useDidUpdateEffect = (effect, inputList = []) => {
  const didMountRef = useRef(false);
  const effectRef = useRef();

  effectRef.current = effect;

  useEffect(() => {
    if (didMountRef.current) effectRef.current();
    else didMountRef.current = true;
  }, inputList);
};
