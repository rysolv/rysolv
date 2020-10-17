const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('../activity');
const { createCommentError } = require('./constants');
const {
  createComment: createCommentQuery,
  updateUserArray,
} = require('../../../db');
const { errorLogger } = require('../../../helpers');

const createComment = async ({ commentInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

    const date = new Date();
    const data = {
      body: commentInput.body || '',
      created_date: date,
      id: uuidv4(),
      modified_date: date,
      target: commentInput.target,
      user_id: userId,
    };
    const comment = await createCommentQuery({ data });

    const activityInput = {
      actionType: 'comment',
      issueId: comment.target,
      userId: comment.user_id,
    };
    await createActivity({ activityInput });

    const user = await updateUserArray({
      column: 'comments',
      data: comment.id,
      userId: comment.user_id,
    });

    const result = {
      body: comment.body,
      commentId: comment.id,
      createdDate: comment.created_date,
      modifiedDate: comment.modified_date,
      profilePic: user.profile_pic,
      target: comment.target,
      userId: comment.user_id,
      username: user.username,
    };
    return {
      __typename: 'Comment',
      ...result,
    };
  } catch (error) {
    const { message } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: message || createCommentError,
    };
  }
};

module.exports = createComment;
