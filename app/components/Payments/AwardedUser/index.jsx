import React from 'react';
import T from 'prop-types';

import { ConditionalRender, ImageLinkWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AwardedUserWrapper,
  CoinWrapper,
  ContentWrapper,
  Funded,
  LinkWrapper,
  Rewarded,
  StyledExternalLink,
  StyledInternalLink,
} from './styledComponents';

const CodeIcon = iconDictionary('code');
const CoinIcon = iconDictionary('coin');

const AwardedUserView = ({ awardedUser, isInFundingQueue, rep }) => {
  const { htmlUrl, id, profilePic, username } = awardedUser || {};
  const AwardedUserComponent = () => (
    <AwardedUserWrapper>
      <CoinWrapper>
        {CoinIcon}
        {rep}
      </CoinWrapper>
      <Rewarded>Rewarded</Rewarded>
      <ContentWrapper>
        <ImageLinkWrapper
          alt={username}
          image={profilePic}
          route={`/users/detail/${id}`}
          size="5rem"
        />
        <div>
          <LinkWrapper>
            <StyledInternalLink to={`/users/detail/${id}`}>
              {username}
            </StyledInternalLink>
          </LinkWrapper>
          <LinkWrapper>
            {CodeIcon}
            <StyledExternalLink href={htmlUrl} target="_blank">
              View pull request
            </StyledExternalLink>
          </LinkWrapper>
        </div>
      </ContentWrapper>
    </AwardedUserWrapper>
  );
  const PendingApprovalComponent = () => (
    <Funded isFunded>Pending Approval</Funded>
  );
  return (
    <ConditionalRender
      Component={AwardedUserComponent}
      FallbackComponent={PendingApprovalComponent}
      shouldRender={!isInFundingQueue}
    />
  );
};

AwardedUserView.propTypes = {
  awardedUser: T.object,
  isInFundingQueue: T.bool.isRequired,
  rep: T.number.isRequired,
};

export default AwardedUserView;
