const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');
const { userValues } = require('./constants');

// Transform single user
const transformUser = async ({ data, userId }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: userValues,
  });
  const queryText = `
    UPDATE users
    SET (${parameters}) = (${substitution})
    WHERE id = '${userId}'
  `;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = transformUser;
