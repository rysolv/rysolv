import React from 'react';
import T from 'prop-types';

import { ConditionalRender, Verified } from 'components/base_ui';

import {
  Account,
  AccountListItem,
  AccountWrapper,
  VerifiedText,
  VerifiedWrapper,
  VerifyLink,
} from './styledComponents';
import { HeaderWrapper, StyledH3 } from '../styledComponents';

const VerifiedAccountsView = ({ isGithubVerified }) => (
  <div>
    <HeaderWrapper>
      <StyledH3>Verified Accounts</StyledH3>
    </HeaderWrapper>
    <VerifiedText>
      Please note that your account needs to be verified with Github before you
      can submit pull requests.
    </VerifiedText>
    <AccountListItem>
      <AccountWrapper>
        <Account>Github</Account>
        <ConditionalRender
          Component={
            <VerifyLink
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${
                process.env.GITHUB_CLIENT_ID
              }`}
            >
              Connect
            </VerifyLink>
          }
          shouldRender={!isGithubVerified}
        />
      </AccountWrapper>
      <ConditionalRender
        Component={<VerifiedWrapper>Not verified</VerifiedWrapper>}
        FallbackComponent={
          <VerifiedWrapper isVerified>
            <Verified />
            Verified
          </VerifiedWrapper>
        }
        shouldRender={!isGithubVerified}
      />
    </AccountListItem>
  </div>
);

VerifiedAccountsView.propTypes = { isGithubVerified: T.bool.isRequired };

export default VerifiedAccountsView;
