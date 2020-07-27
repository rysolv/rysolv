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
  const handleKeypress = e => {
    if (e.keyCode === 13) {
      handleNav('/issues');
    }
  };
  const handleSignout = () => {
    dispatchSignout();
    handleNav('/signin');
  };
  return (
    <SigninWrapper onKeyDown={e => handleKeypress(e)}>
      <InputFormWrapper>
        <Title>Return to your account</Title>
        <RedirectText>
          You are already logged in as{' '}
          <UsernameWrapper>{username}</UsernameWrapper>.
        </RedirectText>
        <StyledPrimaryButton
          label="Go to My Account"
          onClick={() => handleNav('/settings')}
        />
        <StyledButton onClick={handleSignout}>Sign out</StyledButton>
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
