const defaultComparator = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

export const sortComparator = (a, b, order, orderBy) => {
  const orderMultiplier = order === 'asc' ? 1 : -1;
  return orderMultiplier * defaultComparator(a[orderBy], b[orderBy]);
};

export const getComparator = (order, orderBy) => (a, b) =>
  sortComparator(a, b, order, orderBy);

export const stableSort = (array, comparator) =>
  array
    .map((el, index) => [el, index])
    .sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    })
    .map(el => el[0]);
