const { setReadMessages: setReadMessagesQuery } = require('../../../db');
const { readMessageError, readMessageSuccess } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

// Recieve an array of message IDs and mark them as read
// This handles the case of multiple unread messages that
// are viewed at the same time
const setReadMessages = async ({ messageIds }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    console.log(messageIds);

    await setReadMessagesQuery({ messageIds });

    return {
      __typename: 'Success',
      message: readMessageSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || readMessageError,
    };
  }
};

module.exports = setReadMessages;
