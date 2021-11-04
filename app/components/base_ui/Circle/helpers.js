export const generateCircleColor = percentage => {
  if (percentage < 50) return '#e93e43';
  if (percentage >= 50 && percentage < 70) return '#f5a942';
  if (percentage >= 70 && percentage < 90) return '#8ec63f';
  return '#4ebc7a';
};
