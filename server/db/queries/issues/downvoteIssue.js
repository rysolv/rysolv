const pool = require('../../connect');
const { singleItem } = require('../../baseQueries');

// Downvote issue
const downvoteIssue = async ({ issueId, userId }) => {
  const client = await pool.connect();
  try {
    // @TODO: evaluate the need for this query. May be good to remove.
    const [userData] = await singleItem('users', userId);
    const { upvotes } = userData;
    if (!upvotes.includes(issueId)) throw new Error('Downvote failed');

    // Open transaction
    await client.query('BEGIN');

    // Increment issue rep
    const issueQuery =
      'UPDATE issues SET rep = rep - 1 WHERE (id = $1) RETURNING rep';
    const {
      rows: [issueResult],
    } = await client.query(issueQuery, [issueId]);
    const { rep: issueRep } = issueResult;

    // Decrement user rep
    const userQuery = `UPDATE users
        SET rep = rep + 1,
        upvotes = array_remove(upvotes, $1)
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

module.exports = downvoteIssue;
