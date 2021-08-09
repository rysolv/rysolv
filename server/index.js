/* eslint consistent-return:0 import/order:0 */
require('dotenv').config();
const express = require('express');
const graphQlHttp = require('express-graphql');
const { resolve } = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const argv = require('./argv');
const graphQlResolvers = require('./graphql/resolvers');
const graphQlSchema = require('./graphql/schema');
const logger = require('./logger');
const port = require('./port');

const disableIntrospection = require('./middlewares/disableIntrospection');
const setup = require('./middlewares/frontendMiddleware');
const validateToken = require('./middlewares/validateToken');

const app = express();
const PRODUCTION = process.env.NODE_ENV === 'production';

// Parse incoming cookies
app.use(cookieParser());

// For those extra large issues
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// Set express rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // limit each IP to 50 requests per windowMs
});

app.use(limiter);

// Route requests through GraphQL
app.use(
  '/graphql',
  validateToken,
  graphQlHttp((req, res) => ({
    context: {
      authError: req.body.authError,
      email: req.body.email,
      provider: req.body.provider,
      res,
      userId: req.body.userId,
    },
    graphiql: !PRODUCTION,
    rootValue: graphQlResolvers,
    schema: graphQlSchema,
    validationRules: PRODUCTION ? [disableIntrospection] : [],
  })),
);

// In production, we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// Get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
