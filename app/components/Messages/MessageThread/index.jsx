import React, { useEffect } from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
import marked from 'marked';
import moment from 'moment';

import {
  BodyWrapper,
  LowerMessage,
  MessageBody,
  MessageCard,
  MessageContainer,
  MessageDate,
  MessageHeader,
  MessageWrapper,
  ProfilePicture,
  StyledMarkdown,
  StyledPrimaryAsyncButton,
  Username,
} from './styledComponents';

const MessageThread = ({
  activeConversation,
  activeUserId,
  dispatchResetMarkdown,
  error,
  loading,
  messageBody,
  sendMessage,
  setMessageBody,
  success,
}) => {
  useEffect(() => {
    const div = document.getElementById('messageContainer');
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, [activeConversation]);

  useEffect(() => {
    if (error.messagee || success) {
      setTimeout(() => {
        dispatchResetMarkdown();
        setMessageBody('');
      }, 6000);
    }
  }, [error, success]);

  const handleKeypress = ({ ctrlKey, key }) => {
    if (ctrlKey && key === 'Enter' && messageBody.length > 0) {
      sendMessage();
    }
  };

  const { messages } = activeConversation;

  const messageCards = messages.map(
    ({ body, createdDate, firstName, id, lastName, profilePic, userId }) => {
      const active = userId === activeUserId;
      const html = marked(body);
      const cleanHtml = DOMPurify.sanitize(html);

      return (
        <MessageCard active={active} key={id}>
          <BodyWrapper active={active}>
            <MessageHeader>
              <Username>
                {firstName} {lastName}
              </Username>
              <MessageDate>
                {moment(createdDate).format('M/D/YYYY')}
              </MessageDate>
            </MessageHeader>
            <MessageBody dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </BodyWrapper>
          <ProfilePicture src={profilePic} />
        </MessageCard>
      );
    },
  );
  return (
    <MessageWrapper>
      <MessageContainer id="messageContainer">{messageCards}</MessageContainer>
      <LowerMessage>
        <StyledMarkdown
          body={messageBody}
          handleInput={value => setMessageBody(value)}
          onKeyDown={e => handleKeypress(e)}
        />
        <StyledPrimaryAsyncButton
          disabled={messageBody.length < 1}
          label="Send"
          loading={loading.message}
          onClick={sendMessage}
        />
      </LowerMessage>
    </MessageWrapper>
  );
};

MessageThread.propTypes = {
  activeConversation: T.object,
  activeUserId: T.string,
  dispatchResetMarkdown: T.func.isRequired,
  error: T.object.isRequired,
  loading: T.object.isRequired,
  messageBody: T.string,
  sendMessage: T.func,
  setMessageBody: T.func,
  success: T.bool.isRequired,
};

export default MessageThread;
