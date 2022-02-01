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
  mobile,
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

MarkdownContainer.defaultProps = { mobile: false };

MarkdownContainer.propTypes = {
  loading: T.object.isRequired,
  messageBody: T.string.isRequired,
  mobile: T.bool,
  sendMessage: T.func.isRequired,
  setMessageBody: T.func.isRequired,
};

export default MarkdownContainer;
