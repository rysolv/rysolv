const pool = require('../connect');
const { seedQuestions, seedResponses } = require('./questions');

// Populate the Q&A data for jobs
const generateQuestions = async () => {
  await seedQuestions();
  await seedResponses();
  pool.end();
  return 'Finished running generateQuestions';
};

module.exports = {
  generateQuestions,
};

require('make-runnable/custom')({
  printOutputFrame: false,
});
