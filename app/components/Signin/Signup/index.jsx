import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  HorizontalWrapper,
  InputFormWrapper,
  PasswordRequirements,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
} from '../styledComponents';

const Signup = ({
  data: { email, firstName, lastName, password, username, verifyPassword },
  error: { signUp: signUpError },
  handleClearAuthAlerts,
  handleInputChange,
  handleSignUp,
  handleVerifyPassword,
  signUpDisabled,
  signUpLoading,
}) => {
  const handleKeypress = e => {
    if (e.keyCode === 13 && !signUpDisabled) {
      handleSignUp();
    }
  };
  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Create account</Title>
        {signUpError.error && (
          <StyledErrorSuccessBanner
            error={signUpError}
            onClose={handleClearAuthAlerts}
          />
        )}
        <MainTextInput
          error={!!username.error}
          helperText={username.error}
          label="Username"
          onChange={e =>
            handleInputChange({
              field: 'username',
              form: 'signUp',
              value: e.target.value,
            })
          }
          value={username.value}
        />
        <MainTextInput
          autoComplete="email"
          error={!!email.error}
          helperText={email.error}
          label="Email"
          onChange={e =>
            handleInputChange({
              field: 'email',
              form: 'signUp',
              value: e.target.value,
            })
          }
          type="email"
          value={email.value}
        />
        <HorizontalWrapper>
          <MainTextInput
            error={!!firstName.error}
            helperText={firstName.error}
            label="First name"
            onChange={e =>
              handleInputChange({
                field: 'firstName',
                form: 'signUp',
                value: e.target.value,
              })
            }
            value={firstName.value}
          />
          <MainTextInput
            error={!!lastName.error}
            helperText={lastName.error}
            label="Last name"
            onChange={e =>
              handleInputChange({
                field: 'lastName',
                form: 'signUp',
                value: e.target.value,
              })
            }
            value={lastName.value}
          />
        </HorizontalWrapper>
        <MainTextInput
          autoComplete="new-password"
          error={!!password.error}
          helperText={password.error}
          label="Password"
          onChange={e =>
            handleInputChange({
              field: 'password',
              form: 'signUp',
              value: e.target.value,
            })
          }
          type="password"
          value={password.value}
        />
        <PasswordRequirements>
          <li>8 or more characters</li>
          <li>Include capital and lowercase letter</li>
          <li>Include one number</li>
          <li>Include one special character </li>
        </PasswordRequirements>
        <MainTextInput
          autoComplete="new-password"
          error={!!verifyPassword.error}
          helperText={verifyPassword.error}
          label="Confirm password"
          onBlur={() => handleVerifyPassword()}
          onChange={e =>
            handleInputChange({
              field: 'verifyPassword',
              form: 'signUp',
              value: e.target.value,
            })
          }
          type="password"
          value={verifyPassword.value}
        />
        <StyledPrimaryAsyncButton
          disabled={signUpDisabled}
          label="Sign up"
          loading={signUpLoading}
          onClick={() => handleSignUp()}
        />
      </InputFormWrapper>
      <SubText>
        Already have an account? <Link to="/signin">Sign in</Link>
      </SubText>
    </SigninWrapper>
  );
};

Signup.propTypes = {
  data: T.object.isRequired,
  error: T.object,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleSignUp: T.func.isRequired,
  handleVerifyPassword: T.func,
  signUpDisabled: T.bool,
  signUpLoading: T.bool,
};

export default Signup;
