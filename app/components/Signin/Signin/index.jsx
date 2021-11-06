import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { UpdatedTextInput, UpdatedPasswordTextInput } from 'components/base_ui';

import {
  Divider,
  DividerWrapper,
  InputFormContent,
  InputFormWrapper,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledGithubButton,
  StyledLink,
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
        <Title>Sign in to Rysolv</Title>
        <InputFormContent>
          {error && (
            <StyledErrorSuccessBanner
              error={error}
              onClose={handleClearAuthAlerts}
            />
          )}
          <UpdatedTextInput
            autoComplete="email"
            error={email.error}
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
          <UpdatedPasswordTextInput
            autoComplete="current-password"
            error={password.error}
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
          <DividerWrapper>
            <Divider />
            <WordDivider>or</WordDivider>
          </DividerWrapper>
          <StyledGithubButton type="signin" />
        </InputFormContent>
        <StyledLink to="/password-reset">Forgot your password?</StyledLink>
        <SubText>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </SubText>
      </InputFormWrapper>
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
