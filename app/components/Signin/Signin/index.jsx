import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { MainTextInput, PasswordTextInput } from 'components/base_ui';

import {
  InputFormWrapper,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
} from '../styledComponents';

const Signin = ({
  data: { email, password },
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleSignIn,
  handleValidateInput,
  loading,
  signInDisabled,
}) => {
  const handleKeypress = ({ keyCode, which }) => {
    if ((keyCode === 13 || which === 13 || 0) && !signInDisabled) {
      handleSignIn();
    }
  };

  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Sign in</Title>
        {error && (
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAuthAlerts}
          />
        )}
        <MainTextInput
          autoComplete="email"
          error={!!email.error}
          helperText={email.error}
          label="Email"
          onBlur={() => handleValidateInput({ field: 'email' })}
          onChange={e =>
            handleInputChange({
              field: 'email',
              form: 'signIn',
              value: e.target.value,
            })
          }
          type="email"
          value={email.value}
        />
        <PasswordTextInput
          autoComplete="current-password"
          error={!!password.error}
          helperText={password.error}
          label="Password"
          onBlur={() => handleValidateInput({ field: 'password' })}
          onChange={e =>
            handleInputChange({
              field: 'password',
              form: 'signIn',
              value: e.target.value,
            })
          }
          value={password.value}
        />
        <StyledPrimaryAsyncButton
          disabled={signInDisabled}
          label="Sign in"
          loading={loading}
          onClick={handleSignIn}
        />
      </InputFormWrapper>
      <SubText>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </SubText>
    </SigninWrapper>
  );
};

Signin.propTypes = {
  data: T.object.isRequired,
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleSignIn: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  signInDisabled: T.bool.isRequired,
};

export default Signin;
