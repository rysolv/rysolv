import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import {
  GithubButton,
  MainTextInput,
  PasswordTextInput,
} from 'components/base_ui';

import {
  Divider,
  DividerWrapper,
  InputFormWrapper,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
  WordDivider,
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
  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && !signInDisabled) {
      handleSignIn();
    }
  };

  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Sign in and get rysolving</Title>
        {error && (
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAuthAlerts}
          />
        )}
        <GithubButton isSignIn />
        <DividerWrapper>
          <Divider />
          <WordDivider>or</WordDivider>
        </DividerWrapper>
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
