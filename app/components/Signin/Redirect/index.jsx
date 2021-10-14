import React from 'react';
import T from 'prop-types';

import {
  InputFormWrapper,
  RedirectText,
  SigninWrapper,
  StyledButton,
  StyledPrimaryButton,
  Title,
  UsernameWrapper,
} from '../styledComponents';

const Redirect = ({ data: { username }, dispatchSignOut, handleNav }) => {
  const handleSignout = () => {
    dispatchSignOut();
    handleNav('/signin');
  };
  return (
    <SigninWrapper>
      <InputFormWrapper>
        <Title>Return to your account</Title>
        <RedirectText>
          You are already logged in as{' '}
          <UsernameWrapper>{username}</UsernameWrapper>.
        </RedirectText>
        <StyledPrimaryButton
          autoFocus
          disableFocusRipple
          label="Go to My Account"
          onClick={() => handleNav('/dashboard')}
        />
        <StyledButton disableFocusRipple onClick={handleSignout}>
          Sign out
        </StyledButton>
      </InputFormWrapper>
    </SigninWrapper>
  );
};

Redirect.propTypes = {
  data: T.object.isRequired,
  dispatchSignOut: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default Redirect;
