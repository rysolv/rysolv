const { singleQuery } = require('../../baseQueries');

// @TODO: remove this query in favor of getUserAttemptingList
const getWatchList = async (id, type) => {
  const paramsDictionary = {
    issueAttemptList: {
      table: 'users',
      values: 'id, profile_pic AS "profilePic", username',
    },
    issueWatchList: {
      table: 'users',
      values: 'id, profile_pic AS "profilePic", username',
    },
    userAttemptList: {
      table: 'issues',
      values:
        'id, modified_date AS "modifiedDate", name, funded_amount AS "fundedAmount"',
    },
    userWatchList: {
      table: 'issues',
      values:
        'id, modified_date AS "modifiedDate", name, funded_amount AS "fundedAmount"',
    },
  };
  const { values, table } = paramsDictionary[type];
  const queryText = `SELECT ${values} FROM ${table} WHERE id = '${id}'`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getWatchList;
