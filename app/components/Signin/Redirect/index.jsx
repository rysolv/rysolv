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

const Redirect = ({ data: { username }, dispatchSignout, handleNav }) => {
  const handleSignout = () => {
    dispatchSignout();
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
          onClick={() => handleNav('/settings')}
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
  dispatchSignout: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default Redirect;
