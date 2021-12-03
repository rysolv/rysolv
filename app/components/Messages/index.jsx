import React, { useState, useEffect } from 'react';
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

const Messages = ({
  activeConversation,
  activeUser,
  conversations,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  handleNav,
}) => {
  const [messageBody, setMessageBody] = useState('');

  const { id: activeUserId } = activeUser;
  const { candidate, company, position, threadId, unread } = conversations[
    activeConversation
  ];

  useEffect(() => {
    if (unread) dispatchSetReadReceipt({ threadId });
  }, [activeConversation]);

  const sendMessage = () => {
    dispatchSendMessage({
      body: messageBody,
      candidateId: candidate.userId,
      positionId: position.positionId,
      threadId,
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
          handleNav={handleNav}
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
  activeConversation: T.number.isRequired,
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default Messages;
