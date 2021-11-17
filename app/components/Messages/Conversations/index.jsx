import React from 'react';
import moment from 'moment';
import T from 'prop-types';

import {
  ConversationCard,
  ConversationContainer,
  MessageDate,
  MessageHeader,
  MessageSnippit,
  Recipient,
} from './styledComponents';

const Conversation = ({
  activeConversation,
  conversations,
  setActiveConversation,
}) => {
  const conversationCards = conversations.map(({ candidate, messages }, i) => {
    const { firstName, lastName } = candidate;
    const { body, createdDate, firstName: messageFirstName } = messages[0];

    return (
      <ConversationCard
        selected={activeConversation === i}
        key={createdDate}
        onClick={() => setActiveConversation(i)}
      >
        <MessageHeader>
          <Recipient>
            {firstName} {lastName}
          </Recipient>
          <MessageDate>{moment(createdDate).format('M/D/YYYY')}</MessageDate>
        </MessageHeader>

        <MessageSnippit>
          {messageFirstName}: {body.substring(0, 49)}
          {body.length > 50 ? '...' : ''}
        </MessageSnippit>
      </ConversationCard>
    );
  });

  return (
    <ConversationContainer>
      Conversations
      <br />
      <br />
      {conversationCards}
    </ConversationContainer>
  );
};

Conversation.propTypes = {
  conversations: T.array,
  activeConversation: T.number,
  setActiveConversation: T.func,
};

export default Conversation;
