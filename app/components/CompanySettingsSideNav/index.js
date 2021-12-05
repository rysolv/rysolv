import React from 'react';
import T from 'prop-types';

import { InternalLink, SettingsContainer } from './styledComponents';

const CompanySettingsSideNav = ({ handleNav }) => (
  <SettingsContainer>
    <InternalLink
      label="Account &amp; Settings"
      onClick={() => handleNav('/company/settings')}
    />
    <InternalLink
      label="Pricing"
      onClick={() => handleNav('/company/settings/pricing')}
    />
  </SettingsContainer>
);

CompanySettingsSideNav.propTypes = { handleNav: T.func.isRequired };

export default CompanySettingsSideNav;
