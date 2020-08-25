const pool = require('../../connect');
const { singleItem } = require('../../baseQueries');

const upvoteIssue = async ({ issueId, userId }) => {
  // Pulling in Client to use transaction
  const client = await pool.connect();
  try {
    // Validate user has rep and has not upvoted
    const [userData] = await singleItem('users', userId);
    const { rep, upvotes } = userData;

    if (rep - 1 < 0) throw new Error('Not enough points to upvote');
    if (upvotes.includes(issueId))
      throw new Error('Already upvoted this issue');

    // Open transaction
    await client.query('BEGIN');

    // Increment issue rep
    const issueQuery =
      'UPDATE issues SET rep = rep + 1 WHERE (id = $1) RETURNING rep';
    const {
      rows: [issueResult],
    } = await client.query(issueQuery, [issueId]);
    const { rep: issueRep } = issueResult;

    // Decrement user rep
    const userQuery = `UPDATE users
        SET rep = rep - 1,
        upvotes = array_append(upvotes, $1)
        WHERE (id = $2) RETURNING rep`;
    const {
      rows: [userResult],
    } = await client.query(userQuery, [issueId, userId]);
    const { rep: userRep } = userResult;

    // Commit transaction
    await client.query('COMMIT');
    return { issueRep, userRep };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = upvoteIssue;
