import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({ activeUser, view }) => {
  const isMobile = view === 'mobile';

  return (
    <ConditionalRender
      Component={MobileHeader}
      FallbackComponent={DesktopHeader}
      propsToPassDown={{ activeUser, isMobile }}
      shouldRender={isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object,
  view: T.string,
};

export default Header;
