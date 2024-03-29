import React, { useEffect } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  InputFormContent,
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryButton,
  Title,
} from '../styledComponents';
import { IconWrapper, MessageWrapper, ResetSubText } from './styledComponents';

const SuccessIcon = iconDictionary('successOutline');

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
        <InputFormContent>
          <Title hasSubText>Password reset successful</Title>
          <ResetSubText hasFlex>
            <IconWrapper isSuccess>{SuccessIcon}</IconWrapper>
            <MessageWrapper>{message}</MessageWrapper>
          </ResetSubText>
        </InputFormContent>
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
