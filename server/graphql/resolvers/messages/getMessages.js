const { CustomError, errorLogger } = require('../../../helpers');
const {
  getMessages: getMessagesQuery,
  getPositionTechStack,
  getUserTechStack,
} = require('../../../db');
const { getMessagesError } = require('./constants');

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
     *  unread: BOOLEAN
     * }, ...]
     */
    const result = await getMessagesQuery({ userId });

    const conversations = await Promise.all(
      result.map(async el => {
        const { candidate, messages, position } = el;
        let con = { ...el, unread: false };
        messages.forEach(({ userId: fromUserId, readDate }) => {
          if (readDate === null && fromUserId !== userId) {
            con = { ...el, unread: true };
          }
        });

        if (candidate) {
          const { skills } = await getUserTechStack({
            userId: candidate.userId,
          });
          const skillsArray = skills.map(({ name }) => name);
          candidate.preferredLanguages = skillsArray;
          candidate.name = `${candidate.firstName} ${candidate.lastName}`;
        }

        const {
          technologies: positionTechnologies,
        } = await getPositionTechStack({
          positionId: position.positionId,
        });
        position.preferredLanguages = positionTechnologies || [];
        return con;
      }),
    );
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
