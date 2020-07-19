import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  EmailWrapper,
  InputFormWrapper,
  InputSubText,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
  VerificationWrapper,
} from '../styledComponents';

const VerifyEmail = ({
  activeUser: { email },
  error: { verifyEmail: verifyEmailError },
  handleClearAuthAlerts,
  handleInputChange,
  handleVerifyEmail,
  verify: { verificationCode },
  verifyDisabled,
  verifyEmailLoading,
}) => (
  <SigninWrapper>
    <InputFormWrapper>
      <Title>Confirm Your Email</Title>
      {verifyEmailError.error && (
        <StyledErrorSuccessBanner
          error={verifyEmailError}
          onClose={handleClearAuthAlerts}
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
          label="Verification Code"
          onChange={e =>
            handleInputChange({
              field: 'verificationCode',
              form: 'verify',
              value: e.target.value,
            })
          }
          value={verificationCode.value}
        />
      </VerificationWrapper>
      <StyledPrimaryAsyncButton
        loading={verifyEmailLoading}
        disabled={!verifyDisabled}
        label="Verify Email"
        onClick={() => handleVerifyEmail()}
      />
    </InputFormWrapper>
    <SubText>
      Never received a code? <Link to="/contact-us">Contact support</Link>
    </SubText>
  </SigninWrapper>
);

VerifyEmail.propTypes = {
  activeUser: T.object,
  error: T.object,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleVerifyEmail: T.func.isRequired,
  verify: T.object.isRequired,
  verifyDisabled: T.bool,
  verifyEmailLoading: T.bool,
};

export default VerifyEmail;
