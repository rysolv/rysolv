const { singleQuery } = require('../../baseQueries');

const deleteUserPullRequests = async ({ userId }) => {
  const queryText = `
    UPDATE pullrequests
    SET is_deleted = true
    WHERE user_id = $1
  `;
  await singleQuery({ queryText, values: [userId] });
};

module.exports = deleteUserPullRequests;
