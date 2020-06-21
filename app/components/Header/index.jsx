import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({
  activeUser,
  deviceView,
  handleNav,
  handleSignin,
  handleSignout,
  isSignedIn,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile =
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  return (
    <ConditionalRender
      Component={DesktopHeader}
      FallbackComponent={MobileHeader}
      propsToPassDown={{
        activeUser,
        deviceView,
        handleNav,
        handleSignin,
        handleSignout,
        isDrawerOpen,
        isMobile,
        isSignedIn,
        setIsDrawerOpen,
      }}
      shouldRender={!isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object,
  deviceView: T.string,
  handleNav: T.func,
  handleSignin: T.func,
  handleSignout: T.func,
  isSignedIn: T.bool,
};

export default Header;
