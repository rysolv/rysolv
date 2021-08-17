import React from 'react';
import T from 'prop-types';

import { ConditionalRender, Verified } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AccountIcon,
  AccountSquare,
  AccountWrapper,
  StyledText,
  VerifiedWrapper,
  VerifyLink,
} from './styledComponents';

const GithubIcon = iconDictionary('github');

const VerifiedAccountsView = ({ githubUsername, isGithubVerified }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const clientId = isProduction
    ? process.env.GITHUB_VERIFY_CLIENT_ID
    : process.env.GITHUB_VERIFY_CLIENT_ID_DEV;
  const VerifyLinkComponent = () => (
    <VerifyLink
      href={`https://github.com/login/oauth/authorize?scope=repo%20user:email%20read:user&client_id=${clientId}`}
    >
      Connect Github
    </VerifyLink>
  );

  const VerifiedComponent = () => (
    <VerifiedWrapper>
      <Verified />
      Verified
    </VerifiedWrapper>
  );

  const UsernameComponent = () => <StyledText>{githubUsername}</StyledText>;
  return (
    <AccountSquare>
      <AccountWrapper isVerified={isGithubVerified}>
        <AccountIcon isVerified={isGithubVerified}>{GithubIcon}</AccountIcon>
        <ConditionalRender
          Component={VerifyLinkComponent}
          FallbackComponent={VerifiedComponent}
          shouldRender={!isGithubVerified}
        />
      </AccountWrapper>
      <ConditionalRender
        Component={UsernameComponent}
        shouldRender={isGithubVerified}
      />
    </AccountSquare>
  );
};

VerifiedAccountsView.propTypes = {
  githubUsername: T.string,
  isGithubVerified: T.bool.isRequired,
};

export default VerifiedAccountsView;
