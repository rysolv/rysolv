import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({
  activeUser,
  handleSignin,
  handleSignout,
  isSignedIn,
  view,
}) => {
  const isMobile = view === 'mobile';

  return (
    <ConditionalRender
      Component={MobileHeader}
      FallbackComponent={DesktopHeader}
      propsToPassDown={{
        activeUser,
        handleSignin,
        handleSignout,
        isSignedIn,
        isMobile,
        view,
      }}
      shouldRender={isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object,
  handleSignin: T.func,
  handleSignout: T.func,
  isSignedIn: T.bool,
  view: T.string,
};

export default Header;
