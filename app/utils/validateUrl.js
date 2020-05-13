export const validateUrl = async url => {
  try {
    const data = await fetch(url, {
      method: 'HEAD',
      // mode: 'no-cors',
    });
    return data;
  } catch (error) {
    return error;
  }
};
