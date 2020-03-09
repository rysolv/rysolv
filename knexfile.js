module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.HOSTNAME,
      password: process.env.ASSWORD,
      user: process.env.USERNAME,
    },
    pool: {
      max: 50,
      min: 2,
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.HOSTNAME,
      password: process.env.PASSWORD,
      user: process.env.USERNAME,
    },
    pool: {
      max: 50,
      min: 2,
    },
  },
};
