import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import Conversations from '../Conversations';
import MarkdownContainer from '../MarkdownContainer';
import MessageThread from '../MessageThread';
import MobileMessagesHeader from '../MobileMessagesHeader';
import { ConversationsWrapper, MessageWrapper } from '../styledComponents';
import { TabletContainer } from './styledComponents';

const TabletMessages = ({
  activeConversation,
  activeUser,
  conversations,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  error,
  handleNav,
  isThreadView,
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
  const threadTitle = `${isCompany ? candidate.name : company.name} - ${
    position.title
  }`;

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
    <TabletContainer>
      <MobileMessagesHeader
        handleNav={handleNav}
        isThreadView={isThreadView}
        threadTitle={threadTitle}
      />
      <ConditionalRender
        Component={
          <ConversationsWrapper isMobile>
            <Conversations
              activeConversation={activeConversation}
              conversations={conversations}
              handleNav={handleNav}
            />
          </ConversationsWrapper>
        }
        FallbackComponent={
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
        }
        shouldRender={!isThreadView}
      />
    </TabletContainer>
  );
};

TabletMessages.propTypes = {
  activeConversation: T.number.isRequired,
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  error: T.object.isRequired,
  handleNav: T.func.isRequired,
  isThreadView: T.bool.isRequired,
  loading: T.object.isRequired,
  messageBody: T.string.isRequired,
  setMessageBody: T.func.isRequired,
};

export default TabletMessages;
