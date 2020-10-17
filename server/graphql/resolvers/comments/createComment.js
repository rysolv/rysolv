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
    if (authError || !userId) {
      const error = new Error();
      error.alert = authError;
      throw error;
    }

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
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createCommentError,
    };
  }
};

module.exports = createComment;
