const pool = require('../connect');
const { seedQuestions, seedResponses } = require('./questions');
const { seedUserType } = require('./userType');

// Populate the Q&A data for jobs
const generateQuestions = async () => {
  await seedQuestions();
  await seedResponses();
  pool.end();
  return 'Finished running generateQuestions';
};

// Populate the user_type column in users
const generateUserType = async () => {
  await seedUserType();
  pool.end();
  return 'Finished running generateUserType';
};

module.exports = {
  generateQuestions,
  generateUserType,
};

require('make-runnable/custom')({
  printOutputFrame: false,
});
