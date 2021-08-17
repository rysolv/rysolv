/* eslint-disable prettier/prettier */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { LabelWrapper, StyledGithubButton } from './styledComponents';

const GithubIcon = iconDictionary('github');

const GithubButton = ({ type, ...restProps }) => {
  const isProduction = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  const buttonProps = {
    jobs: {
      dev: {
        clientId: process.env.GITHUB_JOBS_CLIENT_ID_DEV,
        label: 'Sign in with Github',
      },
      prod: {
        clientId: process.env.GITHUB_JOBS_CLIENT_ID,
        label: 'Sign in with Github',
      },
    },
    signin: {
      dev: {
        clientId: process.env.GITHUB_SIGNIN_CLIENT_ID_DEV,
        label: 'Sign in with Github',
      },
      prod: {
        clientId: process.env.GITHUB_SIGNIN_CLIENT_ID,
        label: 'Sign in with Github',
      },
    },
    signup: {
      dev: {
        clientId: process.env.GITHUB_SIGNUP_CLIENT_ID_DEV,
        label: 'Sign up with Github',
      },
      prod: {
        clientId: process.env.GITHUB_SIGNUP_CLIENT_ID,
        label: 'Sign up with Github',
      },
    },

  };
  const { clientId, label } = buttonProps[type][isProduction];
  return (
    <StyledGithubButton
      href={`https://github.com/login/oauth/authorize?scope=repo%20user:email%20read:user&client_id=${clientId}`}
      {...restProps}
    >
      {GithubIcon}
      <LabelWrapper>{label}</LabelWrapper>
    </StyledGithubButton>
  );
};

GithubButton.propTypes = { type: T.string.isRequired };

export default GithubButton;
