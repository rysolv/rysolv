import React from 'react';
import T from 'prop-types';
import ConditionalRender from 'components/base_ui/ConditionalRender';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = ({ view }) => {
  const isMobile = view !== 'desktop';

  return (
    <ConditionalRender
      Component={MobileHeader}
      FallbackComponent={DesktopHeader}
      shouldRender={isMobile}
    />
  );
};

Header.propTypes = { view: T.string };

export default Header;
