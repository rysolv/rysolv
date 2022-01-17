import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import Conversations from './Conversations';
import MessageThread from './MessageThread';
import MobileMessagesHeader from './MobileMessagesHeader';
import {
  ConversationsWrapper,
  MobileMessagesContainer,
} from './styledComponents';

const MobileMessages = ({
  activeConversation,
  activeUser,
  conversations,
  dispatchResetMarkdown,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  error,
  handleNav,
  isThreadView,
  loading,
  messageBody,
  setMessageBody,
  success,
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
    <MobileMessagesContainer>
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
        }
        shouldRender={!isThreadView}
      />
    </MobileMessagesContainer>
  );
};

MobileMessages.propTypes = {
  activeConversation: T.number.isRequired,
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  dispatchResetMarkdown: T.func.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  error: T.object.isRequired,
  handleNav: T.func.isRequired,
  isThreadView: T.bool.isRequired,
  loading: T.object.isRequired,
  messageBody: T.string.isRequired,
  setMessageBody: T.func.isRequired,
  success: T.bool.isRequired,
};

export default MobileMessages;
