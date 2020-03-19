/* eslint-disable no-console */
const { Pool } = require('pg');

// const dotenv = require('dotenv');
// dotenv.config();

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  user: 'postgres',
  password: 'Readyplayer1',
  port: 9000,
  host: 'localhost',
  database: 'rysolv',
});

pool.on('connect', () => {
  console.log('Connected to db');
});

pool.on('remove', () => {
  console.log('Client connection ended');
});

module.exports = pool;
