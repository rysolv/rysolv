import React from 'react';
import T from 'prop-types';

import {
  LowerMessage,
  StyledMarkdown,
  StyledPrimaryAsyncButton,
} from './styledComponents';

const MarkdownContainer = ({
  loading,
  messageBody,
  mobile = false,
  sendMessage,
  setMessageBody,
}) => {
  const handleKeypress = ({ ctrlKey, key }) => {
    if (ctrlKey && key === 'Enter' && messageBody.length > 0) {
      sendMessage();
    }
  };

  return (
    <LowerMessage>
      <StyledMarkdown
        body={messageBody}
        mobile={mobile}
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
  );
};

MarkdownContainer.propTypes = {
  loading: T.object.isRequired,
  messageBody: T.string,
  mobile: T.bool,
  sendMessage: T.func,
  setMessageBody: T.func,
};

export default MarkdownContainer;
