const { createMessage: createMessageQuery } = require('../../../db');
const { createMessageError, createMessageSuccess } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const createMessage = async ({ messageInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    console.log(messageInput);

    const data = {
      body: messageInput.body || '',
      created_date: new Date(),
      from_user_id: userId,
      position_id: messageInput.positionId,
      thread_id: messageInput.threadId,
      to_user_id: messageInput.toUserId,
    };
    await createMessageQuery({ data });

    // Email notifitations

    return {
      __typename: 'Success',
      message: createMessageSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createMessageError,
    };
  }
};

module.exports = createMessage;
