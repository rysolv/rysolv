const pool = require('../connect');
const { seedQuestions, seedResponses } = require('./questions');
const { seedTechnologies } = require('./skills');

// Populate the Q&A data for jobs
const generateQuestions = async () => {
  await seedQuestions();
  await seedResponses();
  pool.end();
  return 'Finished running generateQuestions';
};

const generateTechnologies = async () => {
  await seedTechnologies();
  pool.end();
  return 'Finished running generateTechnologies';
};

module.exports = { generateQuestions, generateTechnologies };

require('make-runnable/custom')({
  printOutputFrame: false,
});
