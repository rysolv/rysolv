import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import CompanyProfile from './CompanyProfile';
import Conversations from './Conversations';
import MessageThread from './MessageThread';
import PositionProfile from './PositionProfile';
import UserProfile from './UserProfile';

import {
  ConversationsWrapper,
  ProfileWrapper,
  ThreadWrapper,
  VerticalDivider,
} from './styledComponents';

const DesktopMessages = ({
  activeConversation,
  activeUser,
  conversations,
  dispatchResetMarkdown,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  error,
  handleNav,
  loading,
  messageBody,
  setMessageBody,
  success,
}) => {
  const { id: activeUserId } = activeUser;
  const { candidate, company, position, threadId, unread } = conversations[
    activeConversation
  ];
  const isCompany = !!activeUser.company;

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
    <Fragment>
      <ConversationsWrapper>
        <Conversations
          activeConversation={activeConversation}
          conversations={conversations}
          handleNav={handleNav}
        />
      </ConversationsWrapper>
      <VerticalDivider />
      <ThreadWrapper>
        <MessageThread
          activeConversation={conversations[activeConversation]}
          activeUserId={activeUserId}
          dispatchResetMarkdown={dispatchResetMarkdown}
          error={error}
          loading={loading}
          messageBody={messageBody}
          sendMessage={sendMessage}
          setMessageBody={setMessageBody}
          success={success}
        />
        <ProfileWrapper>
          <ConditionalRender
            Component={CompanyProfile}
            propsToPassDown={{ company }}
            shouldRender={!isCompany}
          />
          <ConditionalRender
            Component={UserProfile}
            propsToPassDown={{ user: candidate }}
            shouldRender={isCompany}
          />
          <PositionProfile position={position} />
        </ProfileWrapper>
      </ThreadWrapper>
    </Fragment>
  );
};

DesktopMessages.propTypes = {
  activeConversation: T.number.isRequired,
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  dispatchResetMarkdown: T.func.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  error: T.object.isRequired,
  handleNav: T.func.isRequired,
  loading: T.object.isRequired,
  messageBody: T.string.isRequired,
  setMessageBody: T.func.isRequired,
  success: T.bool.isRequired,
};

export default DesktopMessages;
