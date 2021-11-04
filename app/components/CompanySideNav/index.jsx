import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopCompanySideNav from './DesktopCompanySideNav';
import MobileCompanySideNav from './MobileCompanySideNav';

const CompanySideNav = ({
  deviceView,
  dispatchSelectPosition,
  handleNav,
  positions,
  selectedPosition,
}) => {
  const handleCreatePosition = () => {
    dispatchSelectPosition({ id: '' });
    handleNav('/company/dashboard/add');
  };

  const handleSelectPosition = ({ id }) => {
    dispatchSelectPosition({ id });
    handleNav('/company/dashboard');
  };

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
        handleCreatePosition,
        handleSelectPosition,
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
  handleNav: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default CompanySideNav;
