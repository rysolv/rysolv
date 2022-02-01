import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import CompanyProfile from '../CompanyProfile';
import Conversations from '../Conversations';
import MarkdownContainer from '../MarkdownContainer';
import MessageThread from '../MessageThread';
import PositionProfile from '../PositionProfile';
import UserProfile from '../UserProfile';
import { ConversationsWrapper, MessageWrapper } from '../styledComponents';
import {
  ProfileWrapper,
  ThreadWrapper,
  VerticalDivider,
} from './styledComponents';

const DesktopMessages = ({
  activeConversation,
  activeUser,
  conversations,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  error,
  handleNav,
  loading,
  messageBody,
  setMessageBody,
}) => {
  const { id: activeUserId } = activeUser;
  const {
    candidate,
    company,
    position,
    threadId,
    toUserId,
    unread,
  } = conversations[activeConversation];
  const isCompany = !!activeUser.company;

  useEffect(() => {
    if (unread) dispatchSetReadReceipt({ threadId });
  }, [activeConversation]);

  const sendMessage = () => {
    dispatchSendMessage({
      body: messageBody,
      candidateId: toUserId,
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
        <MessageWrapper>
          <MessageThread
            activeConversation={conversations[activeConversation]}
            activeUserId={activeUserId}
            error={error}
          />
          <MarkdownContainer
            loading={loading}
            messageBody={messageBody}
            sendMessage={sendMessage}
            setMessageBody={setMessageBody}
          />
        </MessageWrapper>

        <ProfileWrapper>
          <ConditionalRender
            Component={CompanyProfile}
            propsToPassDown={{ company }}
            shouldRender={!isCompany}
          />
          <ConditionalRender
            Component={UserProfile}
            propsToPassDown={{ handleNav, user: candidate }}
            shouldRender={
              isCompany &&
              candidate.name !== 'Deleted User' &&
              candidate.user !== '[deleted]'
            }
          />
          <PositionProfile handleNav={handleNav} position={position} />
        </ProfileWrapper>
      </ThreadWrapper>
    </Fragment>
  );
};

DesktopMessages.propTypes = {
  activeConversation: T.number.isRequired,
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  error: T.object.isRequired,
  handleNav: T.func.isRequired,
  loading: T.object.isRequired,
  messageBody: T.string.isRequired,
  setMessageBody: T.func.isRequired,
};

export default DesktopMessages;
