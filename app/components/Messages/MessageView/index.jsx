import React, { useEffect } from 'react';
import moment from 'moment';
import T from 'prop-types';

import {
  BodyWrapper,
  MessageBody,
  MessageCard,
  MessageContainer,
  MessageDate,
  MessageHeader,
  MessageWrapper,
  ProfilePicture,
  StyledAsyncButton,
  StyledMarkdown,
  TextInput,
  Username,
} from './styledComponents';

const MessageView = ({
  activeConversation,
  activeUserId,
  messageBody,
  sendMessage,
  setMessageBody,
}) => {
  useEffect(() => {
    const div = document.getElementById('messageContainer');
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, [activeConversation]);

  const handleKeypress = ({ ctrlKey, key }) => {
    if (ctrlKey && key === 'Enter' && messageBody.length > 0) {
      sendMessage();
    }
  };

  const { messages } = activeConversation;

  const messageCards = messages
    .map(({ body, firstName, lastName, createdDate, userId, profilePic }) => {
      const active = userId === activeUserId;
      return (
        <MessageCard active={active} key={createdDate}>
          <BodyWrapper>
            <MessageHeader>
              <Username>
                {firstName} {lastName}
              </Username>
              <MessageDate>
                {moment(createdDate).format('M/D/YYYY')}
              </MessageDate>
            </MessageHeader>
            <MessageBody>{body}</MessageBody>
          </BodyWrapper>
          <ProfilePicture src={profilePic} />
        </MessageCard>
      );
    })
    .reverse();
  return (
    <MessageWrapper>
      <MessageContainer id="messageContainer">{messageCards}</MessageContainer>
      <TextInput onKeyDown={e => handleKeypress(e)}>
        <StyledMarkdown
          body={messageBody}
          handleInput={value => setMessageBody(value)}
        />
      </TextInput>
      <StyledAsyncButton
        disabled={messageBody.length < 1}
        label="Send"
        loading={false}
        onClick={() => sendMessage()}
      />
    </MessageWrapper>
  );
};

MessageView.propTypes = {
  activeConversation: T.object,
  activeUserId: T.string,
  messageBody: T.string,
  sendMessage: T.func,
  setMessageBody: T.func,
};

export default MessageView;
