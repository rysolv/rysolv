import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { MainTextInput } from 'components/base_ui';

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
  signInDisabled,
  signInLoading,
}) => (
  <SigninWrapper>
    <InputFormWrapper>
      <Title>Sign In</Title>
      {error.error && (
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
      <MainTextInput
        autoComplete="current-password"
        error={!!password.error}
        helperText={password.error}
        label="Password"
        onChange={e =>
          handleInputChange({
            field: 'password',
            form: 'signIn',
            value: e.target.value,
          })
        }
        type="password"
        value={password.value}
      />
      <StyledPrimaryAsyncButton
        disabled={!signInDisabled}
        label="Sign In"
        loading={signInLoading}
        onClick={() => handleSignIn()}
      />
    </InputFormWrapper>
    <SubText>
      Don’t have an account? <Link to="/signup">Sign up</Link>
    </SubText>
  </SigninWrapper>
);

Signin.propTypes = {
  data: T.object.isRequired,
  error: T.object,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleSignIn: T.func.isRequired,
  signInDisabled: T.bool,
  signInLoading: T.bool,
};

export default Signin;
