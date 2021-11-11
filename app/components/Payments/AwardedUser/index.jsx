import React from 'react';
import T from 'prop-types';

import { ConditionalRender, ImageLinkWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AwardedUserWrapper,
  CoinWrapper,
  LinkWrapper,
  StyledExternalLink,
  StyledInternalLink,
} from './styledComponents';
import { Funded } from '../styledComponents';

const CodeIcon = iconDictionary('code');
const CoinIcon = iconDictionary('coin');

const AwardedUserView = ({ awardedUser, isUserAccepted, rep }) => {
  const { htmlUrl, profilePic, username } = awardedUser || {};
  const AwardedUserComponent = () => (
    <AwardedUserWrapper>
      <CoinWrapper>
        {CoinIcon}
        {rep}
      </CoinWrapper>
      <ImageLinkWrapper
        alt={username}
        image={profilePic}
        route={`/profile/${username}`}
        size="8rem"
      />
      <LinkWrapper>
        <StyledInternalLink to={`/profile/${username}`}>
          {username}
        </StyledInternalLink>
      </LinkWrapper>
      <LinkWrapper>
        {CodeIcon}
        <StyledExternalLink href={htmlUrl} target="_blank">
          View pull request
        </StyledExternalLink>
      </LinkWrapper>
    </AwardedUserWrapper>
  );
  const PendingApprovalComponent = () => (
    <Funded isFunded>Pending Approval</Funded>
  );
  return (
    <ConditionalRender
      Component={AwardedUserComponent}
      FallbackComponent={PendingApprovalComponent}
      shouldRender={isUserAccepted}
    />
  );
};

AwardedUserView.propTypes = {
  awardedUser: T.object,
  isUserAccepted: T.bool.isRequired,
  rep: T.number.isRequired,
};

export default AwardedUserView;
