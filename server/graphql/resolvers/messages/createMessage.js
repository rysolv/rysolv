const { v4: uuidv4 } = require('uuid');
const { createMessage: createMessageQuery } = require('../../../db');
const { createMessageError } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const createMessage = async ({ messageInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const data = {
      body: messageInput.body || '',
      createdDate: new Date(),
      fromUserId: userId,
      positionId: messageInput.positionId,
      threadId: messageInput.threadId || uuidv4(),
      toUserId: messageInput.toUserId,
    };
    const newMessage = await createMessageQuery({ data });

    // Send Email notifitations (async)

    return {
      __typename: 'MessageResponse',
      ...newMessage,
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
