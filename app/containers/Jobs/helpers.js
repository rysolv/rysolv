export const convertFileToDataUrl = async file => {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  if (!dataUrl) return 'data:';
  const base64Data = dataUrl.split(',')[1];
  return `data:application/pdf;base64,${base64Data}`;
};

// eslint-disable-next-line no-useless-escape
export const dataUrlRegex = /^\s*data:([a-z]+\/[a-z0-9\-]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

export const getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question = urlParams.get('question');
  return Number(question);
};

export const optionDictionary = {
  desired_role: 'multipleButton',
  experience: 'multipleButton',
  personal_link: 'autocomplete',
  preferred_languages: 'autocomplete',
  preferred_location: 'multipleButton',
  resume: 'dragAndDrop',
  target_salary: 'singleButton',
  timeline: 'multipleButton',
  us_citizen: 'singleButton',
};
