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

    const [user] = await updateUserArray(
      'users',
      'comments',
      commentInput.user,
      result.id,
    );

    await updateIssueArray('issues', 'comments', result.target, result.id);

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
