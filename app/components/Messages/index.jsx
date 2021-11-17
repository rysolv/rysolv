import React, { useState } from 'react';
import T from 'prop-types';

import CompanyProfile from './CompanyProfile';
import Conversations from './Conversations';
import MessageView from './MessageView';
import PositionProfile from './PositionProfile';
import UserProfile from './UserProfile';

import {
  ConversationWrapper,
  MessageContainer,
  MessageWrapper,
  ProfileWrapper,
} from './styledComponents';

const Messages = ({ activeUser, conversations, dispatchSendMessage }) => {
  // Set most recent conversation as active
  const [activeConversation, setActiveConversation] = useState(0);
  const [messageBody, setMessageBody] = useState('');

  const { id: activeUserId } = activeUser;
  const { candidate, company, position } = conversations[activeConversation];

  const sendMessage = () => {
    dispatchSendMessage({
      body: messageBody,
      positionId: position.id,
      userId: activeUserId,
    });
    setMessageBody('');
  };

  return (
    <MessageContainer>
      <ConversationWrapper>
        <Conversations
          activeConversation={activeConversation}
          candidate={candidate}
          conversations={conversations}
          setActiveConversation={setActiveConversation}
        />
      </ConversationWrapper>
      <MessageWrapper>
        <MessageView
          activeConversation={conversations[activeConversation]}
          activeUserId={activeUserId}
          messageBody={messageBody}
          sendMessage={sendMessage}
          setMessageBody={setMessageBody}
        />
      </MessageWrapper>

      <ProfileWrapper>
        <CompanyProfile company={company} />
        <UserProfile user={candidate} />
        <PositionProfile position={position} />
      </ProfileWrapper>
    </MessageContainer>
  );
};

Messages.propTypes = {
  activeUser: T.object,
  conversations: T.array,
  dispatchSendMessage: T.func,
};

export default Messages;
