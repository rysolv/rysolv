const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');
const { userValues } = require('./constants');

// Create new User
const createUser = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: userValues,
  });
  const queryText = `INSERT INTO
    users( ${parameters} )
    VALUES(${substitution})
    RETURNING
      email,
      id,
      username
  `;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createUser;
