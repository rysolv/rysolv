import React from 'react';
import T from 'prop-types';

import DesktopHeader from './DesktopHeader';

const Header = ({
  activeUser,
  handleNav,
  handleSignin,
  handleSignout,
  isSignedIn,
  view,
}) => {
  const isMobile = view === 'mobile';
  return (
    <DesktopHeader
      activeUser={activeUser}
      handleNav={handleNav}
      handleSignin={handleSignin}
      handleSignout={handleSignout}
      isMobile={isMobile}
      isSignedIn={isSignedIn}
      view={view}
    />
  );
};

Header.propTypes = {
  activeUser: T.object,
  handleNav: T.func,
  handleSignin: T.func,
  handleSignout: T.func,
  isSignedIn: T.bool,
  view: T.string,
};

export default Header;
