const defaultLanguages = [
  'ActionScript',
  'AppleScript',
  'Asp',
  'Bash',
  'BASIC',
  'C',
  'C#',
  'C++',
  'Clojure',
  'COBOL',
  'CoffeeScript',
  'ColdFusion',
  'Elixir',
  'Erlang',
  'F#',
  'Fortran',
  'Go',
  'Groovy',
  'Haskell',
  'Java',
  'JavaScript',
  'Kotlin',
  'Lisp',
  'MySQL',
  'Objective-C',
  'OCaml',
  'Perl',
  'PHP',
  'PostgreSQL',
  'Python',
  'R',
  'Ruby',
  'Rust',
  'Scala',
  'Scheme',
  'Swift',
  'TypeScript',
  'Visual Basic',
];

const getQuestionsError = `Something went wrong when getting the questionnaire.`;

const postUserResponseError = `Something went wrong when saving your responses. Please try again later.`;

const postUserResponseSuccess = `Your responses to the questionnaire have been successfully saved.`;

module.exports = {
  defaultLanguages,
  getQuestionsError,
  postUserResponseError,
  postUserResponseSuccess,
};
