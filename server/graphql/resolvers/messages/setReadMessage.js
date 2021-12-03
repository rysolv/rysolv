const { setReadMessage: setReadMessagesQuery } = require('../../../db');
const { readMessageError, readMessageSuccess } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

// Update read_dates for all unread messages
const setReadMessage = async ({ threadId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await setReadMessagesQuery({ createdDate: new Date(), threadId, userId });

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

module.exports = setReadMessage;
