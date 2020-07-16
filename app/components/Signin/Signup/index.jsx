import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  ErrorWrapper,
  HorizontalWrapper,
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryButton,
  SubText,
  Title,
} from '../styledComponents';

// eslint-disable-next-line arrow-body-style
const Signup = ({
  data,
  error,
  handleInputChange,
  handleSignUp,
  signUpDisabled,
}) => {
  // eslint-disable-next-line no-param-reassign
  const {
    email,
    firstName,
    lastName,
    password,
    username,
    verifyPassword,
  } = data;

  return (
    <SigninWrapper>
      <InputFormWrapper>
        <Title>Create Account</Title>
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
          value={password.value}
        />
        <MainTextInput
          error={!!verifyPassword.error}
          helperText={verifyPassword.error}
          label="Confirm password"
          onChange={e =>
            handleInputChange({
              field: 'verifyPassword',
              form: 'signUp',
              value: e.target.value,
            })
          }
          value={verifyPassword.value}
        />
        <ErrorWrapper>{error.error ? error.message : ''}</ErrorWrapper>

        <StyledPrimaryButton
          disabled={!signUpDisabled}
          label="Sign Up"
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
  handleInputChange: T.func.isRequired,
  handleSignUp: T.func.isRequired,
  signUpDisabled: T.bool,
};

export default Signup;
