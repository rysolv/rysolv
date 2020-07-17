import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { MainTextInput } from 'components/base_ui';

import {
  ErrorWrapper,
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
} from '../styledComponents';

// eslint-disable-next-line arrow-body-style
const Signin = ({
  data,
  error,
  handleInputChange,
  handleSignIn,
  signInDisabled,
  signInLoading,
}) => {
  // eslint-disable-next-line no-param-reassign
  const { email, password } = data;

  return (
    <SigninWrapper>
      <InputFormWrapper>
        <Title>Sign in</Title>

        {error.error && <ErrorWrapper>{error.message}</ErrorWrapper>}

        <MainTextInput
          autoComplete="email"
          error={!!email.error}
          helperText={email.error}
          label="Email"
          type="email"
          onChange={e =>
            handleInputChange({
              field: 'email',
              form: 'signIn',
              value: e.target.value,
            })
          }
          value={email.value}
        />
        <MainTextInput
          autoComplete="current-password"
          error={!!password.error}
          helperText={password.error}
          label="password"
          type="password"
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
          loading={signInLoading}
          disabled={!signInDisabled}
          label="Sign in"
          onClick={() => handleSignIn()}
        />
      </InputFormWrapper>
      <SubText>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </SubText>
    </SigninWrapper>
  );
};

Signin.propTypes = {
  error: T.object,
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleSignIn: T.func.isRequired,
  signInDisabled: T.bool,
  signInLoading: T.bool,
};

export default Signin;
