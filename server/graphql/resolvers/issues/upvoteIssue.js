const {
  downvoteIssue: downvoteIssueQuery,
  upvoteIssue: upvoteIssueQuery,
} = require('../../../db');
const { upvoteIssueError } = require('./constants');

const upvoteIssue = async (args, { authError, userId }) => {
  const { issueId, upvote } = args;
  try {
    if (authError) throw new Error(authError);

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
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || upvoteIssueError({ upvote }),
    };
  }
};

module.exports = upvoteIssue;
