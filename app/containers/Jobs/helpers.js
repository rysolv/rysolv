export const getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question = urlParams.get('question');
  return Number(question);
};

export const optionDictionary = {
  desired_role: 'multipleButton',
  preferred_languages: 'autocomplete',
  preferred_location: 'multipleButton',
  remote: 'singleButton',
  target_salary: 'singleButton',
  us_citizen: 'singleButton',
};
