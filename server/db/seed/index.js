/* eslint-disable no-console */
const readline = require('readline');

const pool = require('../connect');
const { seedQuestions, seedResponses } = require('./questions');
const {
  alterTables,
  createTables,
  dropAllTables,
  printTables,
} = require('./tables');

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Seed function - run via 'npm run seed'
const seed = async () => {
  const {
    options: { database },
  } = pool;

  const rebuild = async () => {
    //  Rebuild tables
    const t1 = Date.now();
    await dropAllTables();
    await createTables();
    await alterTables();

    // Populate the Q&A data for jobs
    await seedQuestions();
    await seedResponses();

    // Log results and end connection
    const t2 = Date.now();
    console.log(`----Seeding complete in ${t2 - t1}ms----`);
    await printTables();
    console.log('seed ended');
    pool.end();
  };

  console.clear();
  console.log('**********************************************************');
  console.log('*         ABOUT TO RE-SEED DEVELOPMENT DATABASE          *');
  console.log('**********************************************************');

  // Prompt user to verify Database
  prompt.question(
    `Re-seed database named "${database}"? Type 'yes' to confirm.\n\n`,
    res => {
      if (res.toLocaleLowerCase() === 'yes') {
        console.log(`Confirmed`);
        console.log(
          '**********************************************************',
        );
        rebuild();
        prompt.close();
      } else {
        console.log('Aborting process');
        prompt.close();
      }
    },
  );
};

module.exports = {
  seed,
};

require('make-runnable/custom')({
  printOutputFrame: false,
});
