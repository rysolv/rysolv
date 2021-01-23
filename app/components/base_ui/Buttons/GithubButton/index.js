/* eslint-disable prettier/prettier */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { LabelWrapper, StyledGithubButton } from './styledComponents';

const GithubIcon = iconDictionary('github');

const GithubButton = ({ isSignIn }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  // eslint-disable-next-line no-nested-ternary
  const clientId = isSignIn
    ? isProduction
      ? process.env.GITHUB_SIGNIN_CLIENT_ID
      : process.env.GITHUB_SIGNIN_CLIENT_ID_DEV
    : isProduction
      ? process.env.GITHUB_SIGNUP_CLIENT_ID
      : process.env.GITHUB_SIGNUP_CLIENT_ID_DEV;
  const label = isSignIn ? 'Sign in with Github' : 'Sign up with Github';
  return (
    <StyledGithubButton
      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}`}
    >
      {GithubIcon}
      <LabelWrapper>{label}</LabelWrapper>
    </StyledGithubButton>
  );
};

GithubButton.defaultProps = { isSignIn: false };

GithubButton.propTypes = { isSignIn: T.bool };

export default GithubButton;
