const { v4: uuidv4 } = require('uuid');
const { createMessage: createMessageQuery } = require('../../../db');
const { createMessageError } = require('./constants');
const { CustomError, errorLogger, sendEmail } = require('../../../helpers');

const createMessage = async ({ messageInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const threadId = messageInput.threadId || uuidv4();
    const data = {
      body: messageInput.body || '',
      createdDate: new Date(),
      fromUserId: userId,
      positionId: messageInput.positionId,
      threadId,
      toUserId: messageInput.toUserId,
    };
    const newMessage = await createMessageQuery({ data });

    // Send Email notifitations (async)
    sendEmail({
      body: { userId: messageInput.toUserId },
      path: '/s/messages/new',
    });

    return {
      __typename: 'MessageResponse',
      ...newMessage,
      threadId,
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
