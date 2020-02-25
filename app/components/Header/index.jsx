import React from 'react';
import T from 'prop-types';
import { ConditionalRender } from 'components/base_ui';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = ({ view }) => {
  const isMobile = view === 'mobile';

  return (
    <ConditionalRender
      Component={MobileHeader}
      FallbackComponent={DesktopHeader}
      propsToPassDown={{ isMobile }}
      shouldRender={isMobile}
    />
  );
};

Header.propTypes = { view: T.string };

export default Header;
