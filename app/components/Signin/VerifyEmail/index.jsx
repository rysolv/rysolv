import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  EmailWrapper,
  ErrorWrapper,
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
  VerificationWrapper,
} from '../styledComponents';

// eslint-disable-next-line arrow-body-style
const VerifyEmail = ({
  activeUser,
  error,
  handleInputChange,
  handleVerifyEmail,
  verify,
  verifyDisabled,
  verifyEmailLoading,
}) => {
  // eslint-disable-next-line no-param-reassign
  const { email } = activeUser;
  const { verificationCode } = verify;

  return (
    <SigninWrapper>
      <InputFormWrapper>
        <Title>Confirm your email</Title>
        <SubText>
          A confirmation email was sent to <EmailWrapper>{email}</EmailWrapper>
        </SubText>
        <VerificationWrapper>
          <MainTextInput
            autoComplete="one-time-code"
            error={!!verificationCode.error}
            helperText={verificationCode.error}
            label="Verification code"
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

        <ErrorWrapper>{error.error ? error.message : ''}</ErrorWrapper>
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
};

VerifyEmail.propTypes = {
  activeUser: T.object,
  error: T.object,
  handleInputChange: T.func.isRequired,
  handleVerifyEmail: T.func.isRequired,
  verify: T.object.isRequired,
  verifyDisabled: T.bool,
  verifyEmailLoading: T.bool,
};

export default VerifyEmail;
