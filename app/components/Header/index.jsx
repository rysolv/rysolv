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
  const isLandingPage = pathname === '/';

  const DesktopHeaderToRender = isLandingPage
    ? DesktopLandingHeader
    : DesktopHeader;
  const MobileHeaderToRender = isLandingPage
    ? MobileLandingHeader
    : MobileHeader;

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
        isLandingPage,
        isMobile,
        isSignedIn,
        location,
        setIsDrawerOpen,
      }}
      shouldRender={!isMobileOrTabletOrLaptop}
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
