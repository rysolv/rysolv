const { CustomError, errorLogger } = require('../../../helpers');
const {
  downvoteIssue: downvoteIssueQuery,
  upvoteIssue: upvoteIssueQuery,
} = require('../../../db');
const { upvoteIssueError } = require('./constants');

const upvoteIssue = async ({ issueId, upvote }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

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
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || upvoteIssueError({ upvote }),
    };
  }
};

module.exports = upvoteIssue;
