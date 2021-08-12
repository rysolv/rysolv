const pool = require('../../connect');
const { CustomError } = require('../../helpers');

const upvoteIssue = async ({ issueId, userId }) => {
  // Pulling in Client to use transaction
  const client = await pool.connect();
  try {
    // Validate user has rep and has not upvoted
    const queryText = 'SELECT rep, upvotes FROM users WHERE id = $1';
    const { rows: userRows } = await client.query(queryText, [userId]);
    const [oneUser] = userRows;
    const { rep, upvotes } = oneUser;

    if (rep - 1 < 0)
      throw new CustomError(
        `You do not have enough points to upvote this issue.`,
      );
    if (upvotes.includes(issueId))
      throw new CustomError(`You have already upvoted this issue.`);

    // Open transaction
    await client.query('BEGIN');

    // Increment issue rep
    const issueQuery =
      'UPDATE issues SET rep = rep + 1 WHERE id = $1 RETURNING rep';
    const {
      rows: [issueResult],
    } = await client.query(issueQuery, [issueId]);
    const { rep: issueRep } = issueResult;

    // Decrement user rep
    const userQuery = `UPDATE users
        SET rep = rep - 1,
        upvotes = array_append(upvotes, $1)
        WHERE id = $2 RETURNING rep`;
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
