import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopCompanySideNav from './DesktopCompanySideNav';
import MobileCompanySideNav from './MobileCompanySideNav';

const CompanySideNav = ({
  deviceView,
  dispatchSelectPosition,
  positions,
  selectedPosition,
}) => {
  const isMobileOrTablet =
    deviceView === 'tablet' ||
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';

  return (
    <ConditionalRender
      Component={DesktopCompanySideNav}
      FallbackComponent={MobileCompanySideNav}
      propsToPassDown={{
        dispatchSelectPosition,
        positions,
        selectedPosition,
      }}
      shouldRender={!isMobileOrTablet}
    />
  );
};

CompanySideNav.propTypes = {
  deviceView: T.string.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default CompanySideNav;
