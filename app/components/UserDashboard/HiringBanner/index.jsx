import React from 'react';
import T from 'prop-types';

import {
  BannerSubtitle,
  BannerTitle,
  HiringBannerButtons,
  StyledHiringBanner,
  StyledHiringLink,
  StyledPrimaryButton,
} from './styledComponents';

const HiringBanner = ({ dispatchSetHiringStatus, handleNav }) => (
  <StyledHiringBanner>
    <BannerTitle>Let your code speak</BannerTitle>
    <BannerSubtitle>
      We review your code history and match you with the right companies.
    </BannerSubtitle>
    <HiringBannerButtons>
      <StyledHiringLink
        onClick={() => dispatchSetHiringStatus({ hiringStatus: false })}
      >
        Not looking right now
      </StyledHiringLink>
      <StyledPrimaryButton
        label="Get Hired"
        onClick={() => handleNav('/jobs')}
      />
    </HiringBannerButtons>
  </StyledHiringBanner>
);
HiringBanner.propTypes = {
  dispatchSetHiringStatus: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default HiringBanner;
