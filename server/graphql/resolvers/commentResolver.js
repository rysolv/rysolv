const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('./activityResolver');
const {
  getIssueComments,
  createComment,
  updateIssueArray,
  updateUserArray,
} = require('../../db');

module.exports = {
  createComment: async args => {
    const { commentInput } = args;
    try {
      const comment = {
        body: commentInput.body || '',
        created_date: new Date(),
        id: uuidv4(),
        modified_date: new Date(),
        target: commentInput.target,
        user_id: commentInput.user,
      };
      const result = await createComment(comment);

      const activityInput = {
        actionType: 'comment',
        issueId: result.target,
        userId: result.user_id,
      };
      await createActivity({ activityInput });

      const [user] = await updateUserArray({
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
