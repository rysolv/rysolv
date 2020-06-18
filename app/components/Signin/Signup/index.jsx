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
const Signup = ({ data, handleInputChange, handleSignin }) => {
  // eslint-disable-next-line no-param-reassign
  const { email, password } = data;
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
          error={!!password.error}
          helperText={password.error}
          label="confirm password"
          onChange={e =>
            handleInputChange({
              field: 'password',
              form: 'data',
              value: e.target.value,
            })
          }
          value={password.value}
        />
        <StyledPrimaryButton
          label="Sign Up"
          onClick={() =>
            handleSignin({ userId: 'b519b064-b5db-4472-ad1b-00e30bdbfa4c' })
          }
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
  handleInputChange: T.func.isRequired,
  handleSignin: T.func.isRequired,
};

export default Signup;
