import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import {
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryButton,
  SubText,
  Title,
} from '../styledComponents';

// eslint-disable-next-line arrow-body-style
const Signup = ({ data, handleInputChange, handleSignUp }) => {
  // eslint-disable-next-line no-param-reassign
  const { email, password, verifyPassword } = data;
  return (
    <SigninWrapper>
      <InputFormWrapper>
        <Title>Register</Title>
        <MainTextInput
          error={!!email.error}
          helperText={email.error}
          label="email"
          onChange={e =>
            handleInputChange({
              field: 'email',
              form: 'data',
              value: e.target.value,
            })
          }
          value={email.value}
        />
        <MainTextInput
          error={!!password.error}
          helperText={password.error}
          label="password"
          onChange={e =>
            handleInputChange({
              field: 'password',
              form: 'data',
              value: e.target.value,
            })
          }
          value={password.value}
        />
        <MainTextInput
          error={!!verifyPassword.error}
          helperText={verifyPassword.error}
          label="confirm password"
          onChange={e =>
            handleInputChange({
              field: 'verifyPassword',
              form: 'data',
              value: e.target.value,
            })
          }
          value={verifyPassword.value}
        />
        <StyledPrimaryButton label="Sign Up" onClick={() => handleSignUp()} />
      </InputFormWrapper>
      <SubText>
        Already have an account? <Link to="/signin">Sign in</Link>
      </SubText>
    </SigninWrapper>
  );
};

Signup.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleSignUp: T.func.isRequired,
};

export default Signup;
