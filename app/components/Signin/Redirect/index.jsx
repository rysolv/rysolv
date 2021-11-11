import React from 'react';
import T from 'prop-types';

import {
  ImportantTextWrapper,
  InputFormWrapper,
  InputSubText,
  SigninWrapper,
  StyledButton,
  StyledPrimaryButton,
  Title,
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
        <Title hasSubText>Return to your account</Title>
        <InputSubText hasFlex>
          You are already logged in as{' '}
          <ImportantTextWrapper>{username}</ImportantTextWrapper>.
        </InputSubText>
        <StyledPrimaryButton
          autoFocus
          disableFocusRipple
          label="Go to your Dashboard"
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
