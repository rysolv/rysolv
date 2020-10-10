/* eslint-disable no-console */
const { Pool } = require('pg');
require('dotenv').config();

console.log('Connected to DB');

const production = process.env.NODE_ENV === 'production';

const pool = new Pool({
  database: production ? process.env.DB_NAME : process.env.DB_NAME_LOCAL,
  host: production ? process.env.DB_HOST : process.env.DB_HOST_LOCAL,
  password: production ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_LOCAL,
  port: production ? process.env.DB_PORT : process.env.DB_PORT_LOCAL,
  user: production ? process.env.DB_USER : process.env.DB_USER_LOCAL,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  max: 20,
});

pool.on('connect', () => {
  console.log('Connected to db');
});

pool.on('error', (err, client) => {
  console.log('PG Error: ', err);
  console.log('in client: ', client);
});

pool.on('remove', () => {
  console.log('Client connection ended');
});

module.exports = pool;
