import React, { useEffect } from 'react';
import T from 'prop-types';

import {
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryButton,
  Title,
} from '../styledComponents';
import { DescriptionText } from './styledComponents';

const ResetPasswordSuccess = ({
  handleReturnToSignIn,
  success: { message },
}) => {
  useEffect(() => document.getElementById('resetSuccess').focus(), []);
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleReturnToSignIn();
    }
  };
  return (
    <SigninWrapper
      id="resetSuccess"
      onKeyDown={e => handleKeypress(e)}
      tabIndex="0"
    >
      <InputFormWrapper>
        <Title isSuccess>Password reset successfully</Title>
        <DescriptionText>{message}</DescriptionText>
        <StyledPrimaryButton
          label="Return to sign in"
          onClick={handleReturnToSignIn}
        />
      </InputFormWrapper>
    </SigninWrapper>
  );
};

ResetPasswordSuccess.propTypes = {
  handleReturnToSignIn: T.func.isRequired,
  success: T.oneOfType([T.bool, T.object]).isRequired,
};

export default ResetPasswordSuccess;
