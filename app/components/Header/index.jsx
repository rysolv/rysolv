import React from 'react';
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
        handleNav,
        handleSignin,
        handleSignout,
        isMobile,
        isSignedIn,
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
