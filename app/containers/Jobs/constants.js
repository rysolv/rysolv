export const CHANGE_INPUT = 'app/Jobs/CHANGE_INPUT';

export const CHANGE_STEP = 'app/Jobs/CHANGE_STEP';

export const SUBMIT_JOB_INFO = 'app/Jobs/SUBMIT_JOB_INFO';
export const SUBMIT_JOB_INFO_FAILURE = 'app/Jobs/SUBMIT_JOB_INFO_FAILURE';
export const SUBMIT_JOB_INFO_SUCCESS = 'app/Jobs/SUBMIT_JOB_INFO_SUCCESS';

export const surveyQuestions = [
  {
    description: 'Test',
    id: 'citizenship',
    label: 'Test',
    options: [{ value: false, label: 'No' }, { value: true, label: 'Yes' }],
    optionType: 'button',
    question: 'Are you a U.S. citizen?',
  },
  {
    description: 'Test',
    id: 'isRemote',
    label: 'Test',
    options: [{ value: false, label: 'No' }, { value: true, label: 'Yes' }],
    optionType: 'button',
    question: 'Are you looking for a remote job?',
  },
  {
    description: 'Test',
    id: 'location',
    label: 'Test',
    options: [{ value: false, label: 'No' }, { value: true, label: 'Yes' }],
    optionType: 'autocomplete',
    question: 'What is the location you are looking in?',
  },
  {
    description: 'Test',
    id: 'salary',
    label: 'Test',
    options: [{ value: false, label: 'No' }, { value: true, label: 'Yes' }],
    optionType: 'dropdown',
    question: 'What is your desired salary range?',
  },
  {
    description: 'Test',
    id: 'language',
    label: 'Test',
    options: [{ value: false, label: 'No' }, { value: true, label: 'Yes' }],
    optionType: 'autocomplete',
    question: 'Select your preferred languages.',
  },
  {
    description: 'Test',
    id: 'experience',
    label: 'Test',
    options: [{ value: false, label: 'No' }, { value: true, label: 'Yes' }],
    optionType: 'dropdown',
    question: 'How many years of experience?',
  },
];
