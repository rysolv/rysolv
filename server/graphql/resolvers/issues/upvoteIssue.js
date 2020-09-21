const {
  downvoteIssue: downvoteIssueQuery,
  upvoteIssue: upvoteIssueQuery,
} = require('../../../db');
const { upvoteIssueError } = require('./constants');

const upvoteIssue = async ({ issueId, upvote, userId }) => {
  try {
    if (upvote) {
      const { issueRep, userRep } = await upvoteIssueQuery({
        issueId,
        userId,
      });
      const result = { issueRep, userRep };
      return {
        __typename: 'Upvote',
        ...result,
      };
    }
    const { issueRep, userRep } = await downvoteIssueQuery({
      issueId,
      userId,
    });

    const result = { issueRep, userRep };
    return {
      __typename: 'Upvote',
      ...result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: upvoteIssueError({ upvote }),
    };
  }
};

module.exports = upvoteIssue;
