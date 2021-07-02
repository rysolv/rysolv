import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ProgressButton } from 'components/base_ui';

import {
  FeedbackContainer,
  Input,
  InputLabel,
  InputWrapper,
} from './styledComponents';

const Feedback = ({
  dispatchResetFeedback,
  dispatchSendContact,
  error,
  loading,
  success,
}) => {
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatchResetFeedback();
        setBody('');
        setEmail('');
      }, 6000);
    }
  }, [error, success]);

  return (
    <FeedbackContainer>
      <InputWrapper>
        <InputLabel>Your email</InputLabel>
        <Input
          height="4.9rem"
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>What are you building?</InputLabel>
        <Input
          height="14.4rem"
          onChange={e => setBody(e.target.value)}
          placeholder="What kind of software? What language? Do you have a repo?"
          value={body}
        />
      </InputWrapper>
      <ProgressButton
        disabled={body.length === 0 || email.length === 0}
        error={error}
        label="Send"
        loading={loading}
        onClick={() => dispatchSendContact({ body, email })}
        success={success}
      />
    </FeedbackContainer>
  );
};

Feedback.propTypes = {
  dispatchResetFeedback: T.func.isRequired,
  dispatchSendContact: T.func.isRequired,
  error: T.bool.isRequired,
  loading: T.bool.isRequired,
  success: T.bool.isRequired,
};

export default Feedback;
