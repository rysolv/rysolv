import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  EmailWrapper,
  InputFormWrapper,
  InputSubText,
  ResendButton,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
  VerificationWrapper,
} from '../styledComponents';

const VerifyEmail = ({
  activeUser: { email },
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleResendCode,
  handleValidateInput,
  handleVerifyEmail,
  loading,
  success,
  verify: { verificationCode },
  verifyDisabled,
}) => {
  const handleKeypress = e => {
    const { key } = e;
    if (key === 'Enter' && !verifyDisabled) {
      e.preventDefault();
      handleVerifyEmail();
    }
  };
  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Confirm your email</Title>
        {(error || success) && (
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAuthAlerts}
            success={success}
          />
        )}
        <InputSubText>
          A confirmation email was sent to <EmailWrapper>{email}</EmailWrapper>.
        </InputSubText>
        <VerificationWrapper>
          <MainTextInput
            autoComplete="one-time-code"
            error={!!verificationCode.error}
            helperText={verificationCode.error}
            label="Verification code"
            onBlur={() => handleValidateInput({ field: 'verificationCode' })}
            onChange={e =>
              handleInputChange({
                field: 'verificationCode',
                form: 'verify',
                value: e.target.value,
              })
            }
            value={verificationCode.value}
          />
          <ResendButton
            disableRipple
            onClick={() => handleResendCode({ email })}
          >
            Resend code
          </ResendButton>
        </VerificationWrapper>
        <StyledPrimaryAsyncButton
          disabled={verifyDisabled}
          label="Verify email"
          loading={loading}
          onClick={handleVerifyEmail}
        />
      </InputFormWrapper>
      <SubText>
        Never received a code? <Link to="/contact-us">Contact support</Link>
      </SubText>
    </SigninWrapper>
  );
};

VerifyEmail.propTypes = {
  activeUser: T.object.isRequired,
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleResendCode: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  handleVerifyEmail: T.func.isRequired,
  loading: T.bool.isRequired,
  success: T.oneOfType([T.bool, T.object]).isRequired,
  verify: T.object.isRequired,
  verifyDisabled: T.bool.isRequired,
};

export default VerifyEmail;
