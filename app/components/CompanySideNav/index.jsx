import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopCompanySideNav from './DesktopCompanySideNav';
import MobileCompanySideNav from './MobileCompanySideNav';

const CompanySideNav = ({
  company,
  deviceView,
  dispatchSelectPosition,
  handleNav,
  positions,
  selectedPosition,
}) => {
  const handleCreatePosition = () => {
    dispatchSelectPosition({ id: '' });
    handleNav('/company/dashboard/add-position');
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
        company,
        handleCreatePosition,
        handleNav,
        handleSelectPosition,
        positions,
        selectedPosition,
      }}
      shouldRender={!isMobileOrTablet}
    />
  );
};

CompanySideNav.propTypes = {
  company: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  positions: T.array.isRequired,
  selectedPosition: T.string.isRequired,
};

export default CompanySideNav;
