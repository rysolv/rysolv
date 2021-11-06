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

const Redirect = ({
  data: { company, username },
  dispatchSignOut,
  handleNav,
}) => {
  const path = company ? '/dashboard' : '/settings';
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
          label="Go to My Dashboard"
          onClick={() => handleNav(path)}
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
