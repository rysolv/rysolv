import React from 'react';
import T from 'prop-types';

import { UpdatedPasswordTextInput, UpdatedTextInput } from 'components/base_ui';

import {
  InputFormWrapper,
  InputSubText,
  PasswordRequirements,
  SigninWrapper,
  StyledPrimaryAsyncButton,
  StyledButton,
  Title,
} from '../styledComponents';
import { ButtonGroup } from './styledComponents';

const ResetPassword = ({
  data: { password, verificationCode },
  dispatchIncrementResetStep,
  handleInputChange,
  handleResetPassword,
  handleValidateInput,
  loading,
  resetPasswordDisabled,
}) => {
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleResetPassword();
    }
  };

  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title hasSubText>Reset your password</Title>
        <InputSubText>
          Check your email for a verification code to reset your password. If it
          doesn&#39;t appear within a few minutes, check your spam folder.
        </InputSubText>
        <UpdatedTextInput
          autoComplete="one-time-code"
          error={verificationCode.error}
          label="Verification code"
          onBlur={() => handleValidateInput({ field: 'verificationCode' })}
          onChange={e =>
            handleInputChange({
              field: 'verificationCode',
              form: 'resetPassword',
              value: e.target.value,
            })
          }
          value={verificationCode.value}
        />
        <UpdatedPasswordTextInput
          autoComplete="new-password"
          error={password.error}
          label="Password"
          onBlur={() => handleValidateInput({ field: 'password' })}
          onChange={e =>
            handleInputChange({
              field: 'password',
              form: 'resetPassword',
              value: e.target.value,
            })
          }
          value={password.value}
        />
        <PasswordRequirements>
          <li>8 or more characters</li>
          <li>Include capital and lowercase letter</li>
          <li>Include one number</li>
          <li>Include one special character </li>
        </PasswordRequirements>
        <ButtonGroup>
          <StyledPrimaryAsyncButton
            disabled={resetPasswordDisabled}
            hasSecondaryButton
            label="Reset"
            loading={loading}
            onClick={handleResetPassword}
          />
          <StyledButton
            disableRipple
            onClick={() => dispatchIncrementResetStep({ step: 1 })}
          >
            Back
          </StyledButton>
        </ButtonGroup>
      </InputFormWrapper>
    </SigninWrapper>
  );
};

ResetPassword.propTypes = {
  data: T.object.isRequired,
  dispatchIncrementResetStep: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleResetPassword: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  resetPasswordDisabled: T.bool.isRequired,
};

export default ResetPassword;
