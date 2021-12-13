import React from 'react';
import T from 'prop-types';

import { InternalLink, SettingsContainer } from './styledComponents';

const CompanySettingsSideNav = ({ selected }) => (
  <SettingsContainer>
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
  </SettingsContainer>
);

CompanySettingsSideNav.propTypes = {
  selected: T.string.isRequired,
};

export default CompanySettingsSideNav;
