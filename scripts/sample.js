/* eslint-disable no-console, no-unused-vars */
const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');

const { connect } = require('./connect');

// Connect to DB
const env = process.argv[2];
const { singleQuery } = connect(env);

/**
 * Describe what this script does
 */

async function sample() {
  const t1 = Date.now();

  // Connect to Octokit API
  const auth = createTokenAuth(process.env.GITHUB_TOKEN);
  const { token } = await auth();
  const GITHUB = new Octokit({
    auth: token,
  });
  const { data } = await GITHUB.rateLimit.get();
  const { rate } = data;
  const { remaining } = rate;
  console.log(`Remaining requests: ${remaining}`);

  const t2 = Date.now();
  console.log(`Finished in  ${t2 - t1}ms`);
  process.exit();
}

sample();
