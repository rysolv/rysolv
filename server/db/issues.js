const pool = require('./connect');
const { mapValues, singleItem, singleQuery, singleSearch } = require('./query');
const { formatParamaters } = require('./helpers');

const issueValues = [
  'attempting',
  'body',
  'comments',
  'contributor_id',
  'created_date',
  'funded_amount',
  'id',
  'is_manual',
  'language',
  'modified_date',
  'name',
  'open',
  'organization_id',
  'rep',
  'repo',
  'type',
  'watching',
];

const issueReturnValues = `
  issues.attempting,
  issues.body,
  issues.comments,
  issues.contributor_id AS "contributorId",
  issues.created_date AS "createdDate",
  issues.funded_amount AS "fundedAmount",
  issues.id,
  issues.is_manual AS "isManual",
  issues.language,
  issues.modified_date AS "modifiedDate",
  issues.name,
  issues.open,
  issues.organization_id AS "organizationId",
  issues.pull_requests AS "pullRequests",
  issues.rep,
  issues.repo,
  issues.type,
  issues.watching
`;

const issueCardValues = `
  ${issueReturnValues},
  organizations.name AS "organizationName",
  organizations.verified AS "organizationVerified"
`;

const issueDetailValues = `
  ${issueCardValues},
  users.id AS "userId",
  users.username,
  users.profile_pic AS "profilePic"
`;

// CLOSE single issue
const closeIssue = async (id, shouldClose) => {
  const rows = await singleItem('issues', id);
  if (rows) {
    const queryText = `UPDATE issues SET open=${!shouldClose} WHERE (id='${id}')`;
    await singleQuery(queryText);
    return `Issue ${id} has been successfully ${
      shouldClose ? 'closed' : 'reopened'
    }.`;
  }
  throw new Error(`Failed to close issue. ID not found in issues`);
};

// Check duplicate issue
const checkDuplicateIssue = async repo => {
  const queryText = `
    SELECT id FROM issues WHERE (repo='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return true;
  }
  return false;
};

// Create new Issue
const createIssue = async data => {
  const { parameters, substitution, values } = formatParamaters(
    issueValues,
    data,
  );

  const queryText = `INSERT INTO
    issues(${parameters})
    VALUES(${substitution})
    returning *`;
  const result = await mapValues(queryText, values);
  return result;
};

// DELETE single issue
const deleteIssue = async id => {
  const rows = await singleItem('issues', id);
  if (rows) {
    const queryText = `DELETE FROM issues WHERE (id='${id}') RETURNING *`;
    await singleQuery(queryText);
    return `ID ${id} successfully deleted from table issues`;
  }
  throw new Error(`Failed to delete issue. ID not found in issues`);
};

// Downvote issue
const downvoteIssue = async ({ issueId, userId }) => {
  const client = await pool.connect();
  try {
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

// GET all issues
const getIssues = async () => {
  const queryText = `SELECT ${issueCardValues} FROM issues JOIN organizations ON (issues.organization_id = organizations.id)`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneIssue = async id => {
  const queryText = `
    SELECT ${issueDetailValues} FROM issues
    JOIN organizations ON (issues.organization_id = organizations.id)
    JOIN users ON (issues.contributor_id = users.id)
    WHERE (issues.id='${id}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in issues`);
};

// SEARCH issues
const searchIssues = async value => {
  const fields = ['issues.body', 'issues.name', 'organizations.name'];
  const queryText = `SELECT ${issueCardValues} FROM issues JOIN organizations ON (issues.organization_id = organizations.id)`;
  const rows = await singleSearch(queryText, fields, value);
  return rows;
};

// TRANSFORM single issue
const transformIssue = async (id, data) => {
  const [rows] = await singleItem('issues', id, issueValues);
  if (rows) {
    const { parameters, substitution, values } = formatParamaters(
      issueValues,
      data,
    );
    const queryText = `UPDATE issues
      SET (${parameters})
      = (${substitution})
      WHERE (id = '${id}')
      RETURNING ${issueReturnValues}`;
    const [result] = await mapValues(queryText, values);
    return result;
  }
  throw new Error(`Failed to update. ID not found in issues`);
};

// UPDATE fund_value of issue for payment
const submitAccountPaymentIssue = async (issueId, fundValue) => {
  const [issueData] = await getOneIssue(issueId);
  const { fundedAmount } = issueData;
  const adjustedFundValue = fundValue + fundedAmount;
  const queryText = `UPDATE issues SET funded_amount=${adjustedFundValue} WHERE (id = '${issueId}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

const updateIssueArray = async ({ column, issueId, data, remove }) => {
  const [issueData] = await singleItem('issues', issueId);
  // Only add unique values to array
  if (!issueData[column].includes(data) || remove) {
    if (remove) {
      const queryText = `UPDATE issues
      SET ${column} = array_remove(${column}, '${data}')
      WHERE (id = '${issueId}')
      RETURNING *`;
      const { rows } = await singleQuery(queryText);
      const [oneRow] = rows;
      return oneRow;
    }
    const queryText = `UPDATE issues
      SET ${column} = array_append(${column}, '${data}')
      WHERE (id = '${issueId}')
      RETURNING *`;
    const { rows } = await singleQuery(queryText);
    const [oneRow] = rows;
    return oneRow;
  }
  return issueData;
};

const upvoteIssue = async ({ issueId, userId }) => {
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

module.exports = {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  deleteIssue,
  downvoteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  submitAccountPaymentIssue,
  transformIssue,
  updateIssueArray,
  upvoteIssue,
};
