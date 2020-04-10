export const formatDollarAmount = value => {
  const valueWithDecimals = parseFloat(value).toFixed(2);
  return `$${valueWithDecimals}`;
};
