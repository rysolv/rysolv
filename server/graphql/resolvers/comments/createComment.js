const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('../activity');
const {
  createComment: createCommentQuery,
  updateIssueArray,
  updateUserArray,
} = require('../../../db');

const createComment = async args => {
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
    const result = await createCommentQuery({ data });

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
};

module.exports = createComment;
