const { v4: uuidv4 } = require('uuid');

const { createMessage: createMessageQuery } = require('../../../db');
const { createMessageError, createMessageSuccess } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const createMessage = async ({ messageInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const date = new Date();
    const data = {
      body: messageInput.body || '',
      created_date: date,
      id: uuidv4(),
      position_id: messageInput.positionId,
      user_id: messageInput.userId,
    };
    await createMessageQuery({ data });

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
