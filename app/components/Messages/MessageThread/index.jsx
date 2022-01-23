import React, { useEffect } from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
import marked from 'marked';
import moment from 'moment';

import {
  BodyWrapper,
  MessageBody,
  MessageCard,
  MessageContainer,
  MessageDate,
  MessageHeader,
  ProfilePicture,
  Username,
} from './styledComponents';

const MessageThread = ({ activeConversation, activeUserId, mobile }) => {
  useEffect(() => {
    const div = document.getElementById('messageContainer');
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, [activeConversation]);

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
    <MessageContainer id="messageContainer" mobile={mobile}>
      {messageCards}
    </MessageContainer>
  );
};

MessageThread.defaultProps = { mobile: false };

MessageThread.propTypes = {
  activeConversation: T.object.isRequired,
  activeUserId: T.string.isRequired,
  mobile: T.bool,
};

export default MessageThread;
