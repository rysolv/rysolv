const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('./activity');
const {
  getIssueComments,
  createComment,
  updateIssueArray,
  updateUserArray,
} = require('../../db');

module.exports = {
  createComment: async args => {
    const { commentInput } = args;
    const date = new Date();
    try {
      const data = {
        body: commentInput.body || '',
        created_date: date,
        id: uuidv4(),
        modified_date: date,
        target: commentInput.target,
        user_id: commentInput.user,
      };
      const result = await createComment({ data });

      const activityInput = {
        actionType: 'comment',
        issueId: result.target,
        userId: result.user_id,
      };
      await createActivity({ activityInput });

      const user = await updateUserArray({
        column: 'comments',
        data: result.id,
        userId: commentInput.user,
      });

      await updateIssueArray({
        column: 'comments',
        data: result.id,
        issueId: result.target,
      });

      return {
        body: result.body,
        commentId: result.id,
        createdDate: result.created_date,
        modifiedDate: result.modified_date,
        profilePic: user.profile_pic,
        target: result.target,
        userId: result.user_id,
        username: user.username,
      };
    } catch (err) {
      throw err;
    }
  },
  getIssueComments: async args => {
    const { issueId } = args;
    try {
      const result = await getIssueComments({ issueId });
      return result;
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
