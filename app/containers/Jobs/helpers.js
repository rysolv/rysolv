export const getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question = urlParams.get('question');
  return Number(question);
};

export const optionDictionary = {
  desired_role: 'multipleButton',
  experience: 'multipleButton',
  preferred_languages: 'autocomplete',
  preferred_location: 'multipleButton',
  target_salary: 'singleButton',
  timeline: 'multipleButton',
  us_citizen: 'singleButton',
};
