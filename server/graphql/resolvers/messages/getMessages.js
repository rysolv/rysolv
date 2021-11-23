const { getMessagesError } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const { getMessages: getMessagesQuery } = require('../../../db');

const getMessages = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    /**
     * returns array of message threads:
     * [{
     *  candidate: {},
     *  company: {},
     *  lastMessageDate: TIMESTAMP,
     *  messageId: UUID,
     *  messages: [{}, ...],
     *  position: {},
     *  threadId: UUID,
     * }, ...]
     */
    const conversations = await getMessagesQuery({ userId });

    return {
      __typename: 'ConversationArray',
      conversations,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getMessagesError,
    };
  }
};

module.exports = getMessages;
