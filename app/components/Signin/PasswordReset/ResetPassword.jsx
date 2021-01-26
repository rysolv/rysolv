import React from 'react';
import T from 'prop-types';

import { MainTextInput, PasswordTextInput } from 'components/base_ui';

import {
  InputFormWrapper,
  PasswordRequirements,
  SigninWrapper,
  StyledPrimaryAsyncButton,
  StyledSecondaryButton,
  Title,
} from '../styledComponents';
import { ButtonGroup, DescriptionText } from './styledComponents';

const ResetPassword = ({
  data: { password, verificationCode, verifyPassword },
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
        <Title>Reset your password</Title>
        <DescriptionText>
          Check your email for a verification code to reset your password. If it
          doesn&#39;t appear within a few minutes, check your spam folder.
        </DescriptionText>
        <MainTextInput
          autoComplete="one-time-code"
          error={!!verificationCode.error}
          helperText={verificationCode.error}
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
        <PasswordTextInput
          autoComplete="new-password"
          error={!!password.error}
          helperText={password.error}
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
        <PasswordTextInput
          autoComplete="new-password"
          error={!!verifyPassword.error}
          helperText={verifyPassword.error}
          label="Confirm password"
          onBlur={() =>
            handleValidateInput({
              field: 'verifyPassword',
              verifyField: { field: 'password', verifyValue: password.value },
            })
          }
          onChange={e =>
            handleInputChange({
              field: 'verifyPassword',
              form: 'resetPassword',
              value: e.target.value,
            })
          }
          value={verifyPassword.value}
        />
        <ButtonGroup>
          <StyledSecondaryButton
            label="Back"
            onClick={() => dispatchIncrementResetStep({ step: 1 })}
          />
          <StyledPrimaryAsyncButton
            disabled={resetPasswordDisabled}
            hasSecondaryButton
            label="Reset"
            loading={loading}
            onClick={handleResetPassword}
          />
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
