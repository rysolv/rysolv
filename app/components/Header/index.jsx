import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopLandingHeader from './DesktopLandingHeader';
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

  return (
    <ConditionalRender
      Component={DesktopLandingHeader}
      FallbackComponent={MobileLandingHeader}
      propsToPassDown={{
        activeUser,
        deviceView,
        handleNav,
        handleResetState,
        handleSignout,
        isDrawerOpen,
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
