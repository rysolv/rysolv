const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('../activity');
const {
  createComment: createCommentQuery,
  getOneUser,
} = require('../../../db');
const { createCommentError } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const createComment = async ({ commentInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

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
    const { profilePic, username } = await getOneUser({ userId });

    const activityInput = {
      actionType: 'comment',
      issueId: comment.target,
      userId: comment.user_id,
    };
    await createActivity({ activityInput });

    const result = {
      body: comment.body,
      commentId: comment.id,
      createdDate: comment.created_date,
      modifiedDate: comment.modified_date,
      profilePic,
      target: comment.target,
      userId: comment.user_id,
      username,
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
