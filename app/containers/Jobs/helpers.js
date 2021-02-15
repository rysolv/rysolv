export const getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question = urlParams.get('question');
  return Number(question) || 1;
};

export const optionDictionary = {
  desired_role: 'button',
  preferred_location: 'autocomplete',
  remote: 'button',
  target_salary: 'autocomplete',
  us_citizen: 'button',
};
