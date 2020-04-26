import React from 'react';
import T from 'prop-types';
import { ConditionalRender } from 'components/base_ui';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = ({ view, activeUser }) => {
  const isMobile = view === 'mobile';

  return (
    <ConditionalRender
      Component={MobileHeader}
      FallbackComponent={DesktopHeader}
      propsToPassDown={{ isMobile, activeUser }}
      shouldRender={isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object,
  view: T.string,
};

export default Header;
