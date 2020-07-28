/* eslint consistent-return:0 import/order:0 */
require('dotenv').config();
const express = require('express');
const logger = require('./logger');
const graphQlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

const argv = require('./argv');
const port = require('./port');
// const router = require('./routes');
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');
const app = express();

// for those extra large issues
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// route requests through GraphQL
app.use(
  '/graphql',
  graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: false,
  }),
);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
