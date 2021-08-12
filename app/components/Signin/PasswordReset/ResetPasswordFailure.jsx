import React, { useEffect } from 'react';
import T from 'prop-types';

import {
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryButton,
  Title,
} from '../styledComponents';
import { DescriptionText } from './styledComponents';

const ResetPasswordFailure = ({ error: { message }, handleReturnToSignIn }) => {
  useEffect(() => document.getElementById('resetFailed').focus(), []);
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleReturnToSignIn();
    }
  };
  return (
    <SigninWrapper
      id="resetFailed"
      onKeyDown={e => handleKeypress(e)}
      tabIndex="0"
    >
      <InputFormWrapper>
        <Title isError>Password reset failed</Title>
        <DescriptionText>{message}</DescriptionText>
        <StyledPrimaryButton
          label="Return to sign in"
          onClick={handleReturnToSignIn}
        />
      </InputFormWrapper>
    </SigninWrapper>
  );
};

ResetPasswordFailure.propTypes = {
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleReturnToSignIn: T.func.isRequired,
};

export default ResetPasswordFailure;
