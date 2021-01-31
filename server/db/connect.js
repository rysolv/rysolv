/* eslint-disable consistent-return, no-console */
const { Pool } = require('pg');
require('dotenv').config();

const switchCredentials = () => {
  switch ('production') {
    case 'development':
      return {
        database: process.env.DB_NAME_DEV,
        host: process.env.DB_HOST_DEV,
        password: process.env.DB_PASSWORD_DEV,
        port: process.env.DB_PORT_DEV,
        user: process.env.DB_USER_DEV,
      };
    case 'local':
      return {
        database: process.env.DB_NAME_LOCAL,
        host: process.env.DB_HOST_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        port: process.env.DB_PORT_LOCAL,
        user: process.env.DB_USER_LOCAL,
      };
    case 'production':
      return {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
      };
    default:
      break;
  }
};

const poolCredentials = switchCredentials();

const pool = new Pool({
  ...poolCredentials,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  max: 20,
});

console.log('Connected to DB:', pool.options.database);

pool.on('connect', () => {
  console.log('Client connected to db');
});

pool.on('error', (err, client) => {
  console.log('PG Error: ', err);
  console.log('in client: ', client);
});

pool.on('remove', () => {
  console.log('Client connection ended');
});

module.exports = pool;
