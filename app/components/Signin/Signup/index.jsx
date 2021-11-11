import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';

import {
  ConditionalRender,
  UpdatedPasswordTextInput,
  UpdatedTextInput,
} from 'components/base_ui';

import {
  ButtonGroup,
  Divider,
  DividerWrapper,
  HorizontalWrapper,
  InputFormContent,
  InputFormWrapper,
  PasswordRequirements,
  SigninWrapper,
  StyledErrorSuccessBanner,
  StyledGithubButton,
  StyledPrimaryAsyncButton,
  SubText,
  Title,
  UserTypeButton,
  WordDivider,
} from '../styledComponents';

const Signup = ({
  data: { email, firstName, lastName, password, username },
  error,
  handleClearAuthAlerts,
  handleInputChange,
  handleSignUp,
  handleValidateInput,
  loading,
  signUpDisabled,
}) => {
  const [selected, setSelected] = useState('Developer');

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && !signUpDisabled) {
      handleSignUp({ isCompany: selected === 'Employer' });
    }
  };
  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Get started with Rysolv</Title>
        <InputFormContent>
          {error && (
            <StyledErrorSuccessBanner
              error={error}
              onClose={handleClearAuthAlerts}
            />
          )}
          <ButtonGroup>
            <UserTypeButton
              disableRipple
              isSelected={selected === 'Developer'}
              label="Developer"
              onClick={() => setSelected('Developer')}
            />
            <UserTypeButton
              disableRipple
              isSelected={selected === 'Employer'}
              label="Employer"
              onClick={() => setSelected('Employer')}
            />
          </ButtonGroup>
          <UpdatedTextInput
            autoComplete="nickname"
            error={username.error}
            label="Username"
            onBlur={() => handleValidateInput({ field: 'username' })}
            onChange={e =>
              handleInputChange({
                field: 'username',
                form: 'signUp',
                value: e.target.value,
              })
            }
            value={username.value}
          />
          <UpdatedTextInput
            autoComplete="email"
            error={email.error}
            label="Email"
            onBlur={() => handleValidateInput({ field: 'email' })}
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
            <UpdatedTextInput
              autoComplete="given-name"
              error={firstName.error}
              label="First name"
              onBlur={() => handleValidateInput({ field: 'firstName' })}
              onChange={e =>
                handleInputChange({
                  field: 'firstName',
                  form: 'signUp',
                  value: e.target.value,
                })
              }
              value={firstName.value}
            />
            <UpdatedTextInput
              autoComplete="family-name"
              error={lastName.error}
              label="Last name"
              onBlur={() => handleValidateInput({ field: 'lastName' })}
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
          <UpdatedPasswordTextInput
            autoComplete="new-password"
            error={password.error}
            label="Password"
            onBlur={() => handleValidateInput({ field: 'password' })}
            onChange={e =>
              handleInputChange({
                field: 'password',
                form: 'signUp',
                value: e.target.value,
              })
            }
            value={password.value}
          />
          <PasswordRequirements>
            <li>8 or more characters</li>
            <li>Include capital and lowercase letter</li>
            <li>Include one number</li>
            <li>Include one special character </li>
          </PasswordRequirements>
          <StyledPrimaryAsyncButton
            disabled={signUpDisabled}
            label="Sign up"
            loading={loading}
            onClick={() => handleSignUp({ isCompany: selected === 'Employer' })}
          />
          <ConditionalRender
            Component={
              <Fragment>
                <DividerWrapper>
                  <Divider />
                  <WordDivider>or</WordDivider>
                </DividerWrapper>
                <StyledGithubButton type="signup" />
              </Fragment>
            }
            shouldRender={selected === 'Developer'}
          />
        </InputFormContent>
        <SubText>
          Already have an account? <Link to="/signin">Sign in</Link>
        </SubText>
      </InputFormWrapper>
    </SigninWrapper>
  );
};

Signup.propTypes = {
  data: T.object.isRequired,
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleClearAuthAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleSignUp: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  signUpDisabled: T.bool.isRequired,
};

export default Signup;
