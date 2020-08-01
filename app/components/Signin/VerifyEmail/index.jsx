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
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleValidateInput,
  handleVerifyEmail,
  loading,
  verify: { verificationCode },
  verifyDisabled,
}) => (
  <SigninWrapper>
    <InputFormWrapper>
      <Title>Confirm your email</Title>
      {error && (
        <StyledErrorSuccessBanner
          error={error}
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
      </VerificationWrapper>
      <StyledPrimaryAsyncButton
        loading={loading}
        disabled={verifyDisabled}
        label="Verify email"
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
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  handleVerifyEmail: T.func.isRequired,
  loading: T.bool.isRequired,
  verify: T.object.isRequired,
  verifyDisabled: T.bool,
};

export default VerifyEmail;
