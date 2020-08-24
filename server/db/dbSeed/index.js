/* eslint-disable no-console */
const readline = require('readline');

const pool = require('../connect');

// Import db functions
const { alterTables, createTables, dropAllTables, printTables } = require('..');

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

    // Log results and end connection
    const t2 = Date.now();
    console.log(`----Seeding complete in ${t2 - t1}ms----`);
    await printTables();
    console.log('seed ended');
    pool.end();
  };

  console.clear();
  if (process.env.NODE_ENV === 'production') {
    console.log('**********************************************************');
    console.log('***********************  WARNING  ************************');
    console.log('**********************************************************');
    console.log('*          ABOUT TO RE-SEED PRODUCTION DATABASE          *');
    console.log('*                    ARE YOU SURE?                       *');
    console.log('**********************************************************\n');
  } else {
    console.log('**********************************************************');
    console.log('*         ABOUT TO RE-SEED DEVELOPMENT DATABASE          *');
    console.log('**********************************************************');
  }

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

// Lets you call functions from node
require('make-runnable/custom')({
  printOutputFrame: false,
});
