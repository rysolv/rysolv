import React from 'react';
import T from 'prop-types';

import { InternalLink, SideNavContainer } from './styledComponents';

const CompanySettingsSideNav = ({ selected }) => (
  <SideNavContainer>
    <InternalLink
      label="Account &amp; Settings"
      selected={selected === 'main'}
      to="/company/settings"
    />
    <InternalLink
      label="Payments"
      selected={selected === 'payments'}
      to="/company/settings/payments"
    />
  </SideNavContainer>
);

CompanySettingsSideNav.propTypes = {
  selected: T.string.isRequired,
};

export default CompanySettingsSideNav;
