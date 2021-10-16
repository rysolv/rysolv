const pool = require('../connect');
const { seedQuestions, seedResponses } = require('./questions');
const { seedSkills } = require('./skills');

// Populate the Q&A data for jobs
const generateQuestions = async () => {
  await seedQuestions();
  await seedResponses();
  pool.end();
  return 'Finished running generateQuestions';
};

const generateSkills = async () => {
  await seedSkills();
  pool.end();
  return 'Finished running generateSkills';
};

module.exports = { generateQuestions, generateSkills };

require('make-runnable/custom')({
  printOutputFrame: false,
});
