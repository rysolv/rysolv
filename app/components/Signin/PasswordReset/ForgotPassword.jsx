import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  InputFormWrapper,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  Title,
} from '../styledComponents';
import { DescriptionText } from './styledComponents';

const ForgotPassword = ({
  data: { email },
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleSendLink,
  handleValidateInput,
  loading,
  sendLinkDisabled,
}) => {
  const handleKeypress = e => {
    const { key } = e;
    if (key === 'Enter' && !sendLinkDisabled) {
      e.preventDefault();
      handleSendLink();
    }
  };

  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Forgot your password?</Title>
        {error && (
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAuthAlerts}
          />
        )}
        <DescriptionText>
          Enter your user account&#39;s email address, and we will send you a
          code to reset your password.
        </DescriptionText>
        <MainTextInput
          autoComplete="email"
          error={!!email.error}
          helperText={email.error}
          label="Email"
          onBlur={() => handleValidateInput({ field: 'email' })}
          onChange={e =>
            handleInputChange({
              field: 'email',
              form: 'sendLink',
              value: e.target.value,
            })
          }
          type="email"
          value={email.value}
        />
        <StyledPrimaryAsyncButton
          disabled={sendLinkDisabled}
          label="Send Code"
          loading={loading}
          onClick={handleSendLink}
        />
      </InputFormWrapper>
    </SigninWrapper>
  );
};

ForgotPassword.propTypes = {
  data: T.object.isRequired,
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleSendLink: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  sendLinkDisabled: T.bool.isRequired,
};

export default ForgotPassword;
