/* eslint-disable no-console */
const { Pool } = require('pg');
require('dotenv').config();

console.log('Connected to DB');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rysolv',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  max: 10, // default 10 connections
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
