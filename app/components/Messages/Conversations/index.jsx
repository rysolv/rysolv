import React, { Fragment } from 'react';
import moment from 'moment';
import T from 'prop-types';

import {
  ConversationCard,
  MessageDate,
  MessageHeader,
  MessageSnippit,
  Recipient,
  Unread,
} from './styledComponents';

const Conversation = ({ activeConversation, conversations, handleNav }) => (
  <Fragment>
    {conversations.map(({ candidate, messages, unread, threadId }, i) => {
      const { firstName, lastName } = candidate;
      const { body, createdDate, firstName: messageFirstName } = messages[
        messages.length - 1
      ];

      return (
        <ConversationCard
          isSelected={activeConversation === i}
          key={createdDate}
          onClick={() => handleNav(`/messages/${threadId}`)}
          unread={unread}
        >
          <MessageHeader>
            <Recipient>
              <Unread unread={unread} /> {firstName} {lastName}
            </Recipient>
            <MessageDate>{moment(createdDate).format('M/D/YYYY')}</MessageDate>
          </MessageHeader>

          <MessageSnippit>
            {messageFirstName}: {body.substring(0, 49)}
            {body.length > 50 ? '...' : ''}
          </MessageSnippit>
        </ConversationCard>
      );
    })}
  </Fragment>
);

Conversation.propTypes = {
  activeConversation: T.number.isRequired,
  conversations: T.array.isRequired,
  handleNav: T.func.isRequired,
};

export default Conversation;
