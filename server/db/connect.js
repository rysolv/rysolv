/* eslint-disable no-console */
const { Pool } = require('pg');
require('dotenv').config();

console.log('Connect');

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rysolv',
  idleTimeoutMillis: 10000, // default 10s
  max: 10, // default 10 connections
});

pool.on('connect', () => {
  console.log('Connected to db');
});

pool.on('remove', () => {
  console.log('Client connection ended');
});

module.exports = pool;
