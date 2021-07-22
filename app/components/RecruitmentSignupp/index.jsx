/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  BackgroundHollowCircleBottomIcon,
  BackgroundHollowCircleTopIcon,
  BackgroundSolidCircleIcon,
  HeaderImageLeftIcon,
  HeaderImageRightIcon,
  LandingContainer,
} from './styledComponents';

const BackgroundHollowCircle = iconDictionary('backgroundHollowCircle');
const BackgroundSolidCircle = iconDictionary('backgroundSolidCircle');
const HeaderImageLeft = iconDictionary('headerImageLeft');
const HeaderImageRight = iconDictionary('headerImageRight');

const RecruitmentSignup = () => (
  <Fragment>
    <LandingContainer>
     
    </LandingContainer>
    <HeaderImageRightIcon>{HeaderImageRight}</HeaderImageRightIcon>
    <HeaderImageLeftIcon>{HeaderImageLeft}</HeaderImageLeftIcon>
    <BackgroundHollowCircleTopIcon>
      {BackgroundHollowCircle}
    </BackgroundHollowCircleTopIcon>
    <BackgroundHollowCircleBottomIcon>
      {BackgroundHollowCircle}
    </BackgroundHollowCircleBottomIcon>
    <BackgroundSolidCircleIcon>
      {BackgroundSolidCircle}
    </BackgroundSolidCircleIcon>
  </Fragment>
);

RecruitmentSignup.propTypes = {};

export default RecruitmentSignup;
