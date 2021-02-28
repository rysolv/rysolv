/* eslint-disable consistent-return, no-console */
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connect = env => {
  const switchCredentials = () => {
    switch (env) {
      case 'dev':
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
      case 'prod':
        return {
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
        };
      default:
        console.log('Must pass an argument: [local, dev, prod]');
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

  // Single Query. Accepts array of values for parameterized queries
  const singleQuery = async ({ queryText, values }) => {
    const client = await pool.connect();
    try {
      const result = await client.query(queryText, values);
      client.release();
      return result;
    } catch (error) {
      client.release();
      throw error;
    }
  };

  return { pool, singleQuery };
};

module.exports = { connect };
