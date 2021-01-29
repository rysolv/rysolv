export const getPage = ({ count }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get('page');
  return count < page ? 0 : Number(page);
};
