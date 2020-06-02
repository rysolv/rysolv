import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { MainTextInput, PrimaryButton } from 'components/base_ui';

import {
  SigninWrapper,
  InputFormWrapper,
  Title,
  SubText,
} from './styledComponents';

// eslint-disable-next-line arrow-body-style
const Signin = ({ data, handleInputChange, handleSignin }) => {
  // eslint-disable-next-line no-param-reassign
  const { email, password } = data;
  return (
    <SigninWrapper>
      <InputFormWrapper>
        <Title>Sign in</Title>
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
        <PrimaryButton
          label="Sign in"
          onClick={() =>
            handleSignin({ userId: 'b519b064-b5db-4472-ad1b-00e30bdbfa4c' })
          }
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
  handleInputChange: T.func.isRequired,
  handleSignin: T.func.isRequired,
};

export default Signin;
