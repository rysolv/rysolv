const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('./activityResolver');
const {
  getComments,
  getIssueComments,
  createComment,
  updateIssueArray,
  updateUserArray,
} = require('../../db');

module.exports = {
  createComment: async args => {
    const { commentInput } = args;
    try {
      const comment = [
        [
          uuidv4(),
          new Date(),
          new Date(),
          commentInput.target,
          commentInput.body || '',
          commentInput.user,
        ],
      ];
      const [result] = await createComment(comment);

      const activityInput = {
        actionType: 'comment',
        issueId: result.target,
        userId: result.user_id,
      };
      await createActivity({ activityInput });

      const [user] = await updateUserArray({
        column: 'comments',
        userId: commentInput.user,
        data: result.id,
      });
      await updateIssueArray({
        column: 'comments',
        issueId: result.target,
        data: result.id,
      });

      return {
        commentId: result.id,
        createdDate: result.created_date,
        modifiedDate: result.modified_date,
        target: result.target,
        body: result.body,
        userId: result.user_id,
        username: user.username,
        profilePic: user.profile_pic,
      };
    } catch (err) {
      throw err;
    }
  },
  getComments: async () => {
    try {
      const result = await getComments('comments');
      return result;
    } catch (err) {
      throw err;
    }
  },
  getIssueComments: async args => {
    const { id } = args;
    try {
      const result = await getIssueComments('comments', id);
      return result;
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
