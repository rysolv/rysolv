import React from 'react';
import T from 'prop-types';

import {
  BannerSubtitle,
  BannerTitle,
  HiringBanner,
  HiringBannerButtons,
  HiringHeader,
  MessageButton,
  MessageContainer,
  MessageHeader,
  StyledPrimaryButton,
  StyledHiringLink,
} from './styledComponents';

const UserDashboard = ({
  dismissBanner,
  displayBanner,
  handleNav,
  messages,
}) => {
  console.log(displayBanner);

  const jobStatus = (
    <HiringHeader>
      <MessageContainer>
        <MessageHeader>{messages} matches</MessageHeader>
        <MessageButton>View Messages</MessageButton>
      </MessageContainer>
      <MessageContainer>
        <MessageHeader>My Profile</MessageHeader>
        <MessageButton>Update details</MessageButton>
      </MessageContainer>
    </HiringHeader>
  );

  const hiringBanner = (
    <HiringBanner>
      <BannerTitle>Let your code speak</BannerTitle>
      <BannerSubtitle>
        We review your code history and match you with the right companies.
      </BannerSubtitle>
      <HiringBannerButtons>
        <StyledHiringLink onClick={() => dismissBanner()}>
          Not looking right now
        </StyledHiringLink>
        <StyledPrimaryButton
          label="Get Hired"
          onClick={() => handleNav('/jobs')}
        />
      </HiringBannerButtons>
    </HiringBanner>
  );

  return displayBanner ? hiringBanner : jobStatus;
};

UserDashboard.propTypes = {
  displayBanner: T.bool.isRequired,
  messages: T.number.isRequired,
};

export default UserDashboard;
