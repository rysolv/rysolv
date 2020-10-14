/* eslint-disable react/no-danger */
import React from 'react';
import T from 'prop-types';

import { MessageWrapper, SingleText, StyledListItem } from './styledComponents';

const BannerMessage = ({ messages }) => {
  const hasMultipleMessages = Array.isArray(messages);
  if (!hasMultipleMessages)
    return (
      <SingleText>
        <div dangerouslySetInnerHTML={{ __html: messages.message }} />
      </SingleText>
    );
  return (
    <MessageWrapper>
      {messages.map(({ message }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledListItem key={`alert-${i}`}>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </StyledListItem>
      ))}
    </MessageWrapper>
  );
};

BannerMessage.propTypes = {
  messages: T.oneOfType([T.bool, T.object]),
};

export default BannerMessage;
