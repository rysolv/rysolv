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

export const formatWordString = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const handleCreditCardNumberChange = (
  event,
  newCreditCardNumber,
  setCreditCardNumber,
) => {
  const formattedNumber = newCreditCardNumber.replace(/[^0-9]/g, '');
  if (formattedNumber.length > 4 && formattedNumber.length <= 8) {
    setCreditCardNumber(
      `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(4)}`,
    );
  } else if (formattedNumber.length > 8 && formattedNumber.length <= 12) {
    setCreditCardNumber(
      `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(
        4,
        8,
      )} ${formattedNumber.slice(8)}`,
    );
  } else if (formattedNumber.length > 12 && formattedNumber.length <= 16) {
    setCreditCardNumber(
      `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(
        4,
        8,
      )} ${formattedNumber.slice(8, 12)} ${formattedNumber.slice(12)}`,
    );
  } else {
    setCreditCardNumber(formattedNumber);
  }
};

export const handleDateChange = (event, newDate, setDateValue) => {
  const formattedDate = newDate.replace(/[^0-9]/g, '');
  if (formattedDate.length > 2 && formattedDate.length <= 6) {
    setDateValue(`${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`);
  } else {
    setDateValue(formattedDate);
  }
};

export const handleCvcChange = (event, newCvc, setCvcValue) => {
  const formattedCvc = newCvc.replace(/[^0-9]/g, '');
  setCvcValue(formattedCvc);
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
