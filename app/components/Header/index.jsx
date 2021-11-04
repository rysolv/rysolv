import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import DesktopLandingHeader from './DesktopLandingHeader';
import MobileHeader from './MobileHeader';
import MobileLandingHeader from './MobileLandingHeader';

const Header = ({
  activeUser,
  deviceView,
  handleNav,
  handleResetState,
  handleSignout,
  isSignedIn,
  location,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile =
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  const isMobileOrTabletOrLaptop =
    isMobile ||
    deviceView === 'tablet' ||
    deviceView === 'laptopS' ||
    deviceView === 'laptop';

  const { pathname } = window.location;
  const isLandingOrRecruitmentPage =
    pathname === '/' ||
    pathname === '/company/dashboard' ||
    pathname === '/company/dashboard/add' ||
    pathname === '/how-we-score-code' ||
    pathname === '/jobs' ||
    pathname === '/recruitment' ||
    pathname === '/signup/company';

  const DesktopHeaderToRender = isLandingOrRecruitmentPage
    ? DesktopLandingHeader
    : DesktopHeader;

  const MobileHeaderToRender = isLandingOrRecruitmentPage
    ? MobileLandingHeader
    : MobileHeader;

  const shouldRender = isLandingOrRecruitmentPage
    ? !isMobileOrTabletOrLaptop
    : !isMobile;

  return (
    <ConditionalRender
      Component={DesktopHeaderToRender}
      FallbackComponent={MobileHeaderToRender}
      propsToPassDown={{
        activeUser,
        deviceView,
        handleNav,
        handleResetState,
        handleSignout,
        isDrawerOpen,
        isLandingOrRecruitmentPage,
        isMobile,
        isSignedIn,
        location,
        setIsDrawerOpen,
      }}
      shouldRender={shouldRender}
    />
  );
};

Header.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  location: T.object.isRequired,
};

export default Header;
