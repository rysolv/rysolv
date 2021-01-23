import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({
  activeUser,
  deviceView,
  handleNav,
  handleResetState,
  handleSignin,
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
  const { pathname } = window.location;
  const isLandingPage = pathname === '/';
  return (
    <ConditionalRender
      Component={DesktopHeader}
      FallbackComponent={MobileHeader}
      propsToPassDown={{
        activeUser,
        deviceView,
        handleNav,
        handleResetState,
        handleSignin,
        handleSignout,
        isDrawerOpen,
        isLandingPage,
        isMobile,
        isSignedIn,
        location,
        setIsDrawerOpen,
      }}
      shouldRender={!isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignin: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  location: T.object.isRequired,
};

export default Header;
