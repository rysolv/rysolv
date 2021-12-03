import React from 'react';
import T from 'prop-types';

import { UpdatedTextInput } from 'components/base_ui';

import {
  InputFormContent,
  InputFormWrapper,
  InputSubText,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  Title,
} from '../styledComponents';
import { TextInputWrapper } from './styledComponents';

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
        <InputFormContent>
          <Title hasSubText>Forgot your password?</Title>
          {error && (
            <StyledErrorSuccessBanner
              error={error}
              hasSubText
              onClose={handleClearAuthAlerts}
            />
          )}
          <InputSubText>
            Enter your user account&#39;s email address, and we will send you a
            code to reset your password.
          </InputSubText>
          <TextInputWrapper>
            <UpdatedTextInput
              autoComplete="email"
              error={email.error}
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
          </TextInputWrapper>
        </InputFormContent>
        <StyledPrimaryAsyncButton
          disabled={sendLinkDisabled}
          label="Send code"
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
