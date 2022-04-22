import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import DOMPurify from 'dompurify';
import marked from 'marked';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';

import {
  BodyWrapper,
  Date,
  DateDivider,
  DateRow,
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
    (
      { body, createdDate, firstName, id, lastName, profilePic, userId },
      index,
    ) => {
      const active = userId === activeUserId;
      const html = marked(body);
      const cleanHtml = DOMPurify.sanitize(html);
      const prevMessage = messages[index - 1] || {};

      return (
        <Fragment key={id}>
          <ConditionalRender
            Component={
              <DateRow>
                <DateDivider />
                <Date>{moment(createdDate).format('MMM DD')}</Date>
                <DateDivider />
              </DateRow>
            }
            shouldRender={
              index === 0 ||
              moment(createdDate).format('YYYY/MM/DD') !==
                moment(prevMessage.createdDate).format('YYYY/MM/DD')
            }
          />
          <MessageCard active={active}>
            <BodyWrapper active={active}>
              <MessageHeader>
                <Username>
                  {firstName} {lastName}
                </Username>
                <MessageDate>{moment(createdDate).format('LT')}</MessageDate>
              </MessageHeader>
              <MessageBody dangerouslySetInnerHTML={{ __html: cleanHtml }} />
            </BodyWrapper>
            <ProfilePicture src={profilePic} />
          </MessageCard>
        </Fragment>
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
