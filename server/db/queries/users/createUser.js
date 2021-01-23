const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');
const { userValues } = require('./constants');

// Create new user
const createUser = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: userValues,
  });
  const queryText = `INSERT INTO
    users( ${parameters} )
    VALUES(${substitution})
    RETURNING
      CASE WHEN github_id IS NOT NULL THEN true ELSE false END AS "isGithubVerified",
      email,
      github_username AS "githubUsername",
      id,
      username
  `;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createUser;
