const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');
const { userValues, userReturnValues } = require('./constants');

// Transform single user
const transformUser = async ({ userId, data }) => {
  try {
    const { parameters, substitution, values } = formatParameters({
      newObject: data,
      tableParameters: userValues,
    });
    const queryText = `
      UPDATE users
      SET (${parameters}) = (${substitution})
      WHERE id = '${userId}'
      RETURNING ${userReturnValues}`;
    const { rows } = await singleQuery({ queryText, values });
    const [oneRow] = rows;
    return oneRow;
  } catch (error) {
    throw new Error(`Failed to update users.`);
  }
};

module.exports = transformUser;
