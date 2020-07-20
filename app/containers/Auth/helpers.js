const readCookie = name => {
  const result = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  if (result) {
    return JSON.parse(result[1]);
  }
  return false;
};

export const setCookie = ({ userId }) => {
  clearCookie('userId');
  const activeUser = {
    id: userId,
  };
  document.cookie = `userId=${JSON.stringify(activeUser)}`;
};

export const checkCookie = () => {
  if (readCookie('userId')) {
    const { id } = readCookie('userId');
    return { userId: id };
  }
  return false;
};

export const clearCookie = name => {
  document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/;`;
};
