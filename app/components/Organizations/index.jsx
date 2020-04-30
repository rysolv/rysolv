import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import OrganizationCard from './Card';
import {
  BannerWrapper,
  OrganizationWrapper,
  OrganizationCardWrapper,
} from './styledComponents';

const Organizations = ({
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleDeleteOrganization,
  handleFetchInfo,
  handleInputChange,
  handleNav,
  handleSearchOrganizations,
  search,
}) => {
  const hasOrganizations = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    handleDeleteOrganization,
    handleFetchInfo,
    handleNav,
  };
  const route = '/admin/organizations/add';
  const viewToRender = hasOrganizations ? (
    <OrganizationCardWrapper>
      <OrganizationCard {...propsToPassDown} />
    </OrganizationCardWrapper>
  ) : (
    <EmptyCard />
  );
  return (
    <div>
      <BannerWrapper>
        <AdminSubHeader
          disabled={disabled}
          handleInputChange={handleInputChange}
          handleNav={handleNav}
          handleSearch={handleSearchOrganizations}
          route={route}
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <OrganizationWrapper>{viewToRender}</OrganizationWrapper>
    </div>
  );
};

Organizations.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  disabled: T.bool.isRequired,
  handleDeleteOrganization: T.func,
  handleFetchInfo: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchOrganizations: T.func,
  search: T.object,
};

export default Organizations;
