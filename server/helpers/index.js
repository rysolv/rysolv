const arrayCheck = result => {
  if (Array.isArray(result) && result.length > 1) {
    return result;
  }
  if (Array.isArray(result) && result.length === 1) {
    return result[0];
  }
  return null;
};

module.exports = {
  arrayCheck,
};
