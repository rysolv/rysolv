import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';
import Filter from 'components/Filter';
import autocompleteDictionary from 'utils/autocompleteDictionary';

import SubHeader from 'components/SubHeader';
import EmptyCard from './EmptyCard';
import OrganizationCard from './Card';
import {
  BannerWrapper,
  CardTitle,
  FilterContainer,
  OrganizationWrapper,
  OverviewWrapper,
  SubHeaderWrapper,
} from './styledComponents';

const Organizations = ({
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleInputChange,
  handleNav,
  handleSearchOrganizations,
  search,
}) => {
  const hasOrganizations = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    handleNav,
  };
  const route = '/organizations/add';
  const viewToRender = hasOrganizations ? (
    <OrganizationCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <OverviewWrapper>
      <SubHeaderWrapper>
        <SubHeader initialValue={1} handleNav={handleNav} />
      </SubHeaderWrapper>
      <CardTitle>Find Organizations</CardTitle>
      <OrganizationWrapper>
        <FilterContainer>
          <Filter languageOptions={autocompleteDictionary.language} />
        </FilterContainer>
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
          {viewToRender}
        </div>
      </OrganizationWrapper>
    </OverviewWrapper>
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
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchOrganizations: T.func,
  search: T.object,
};

export default Organizations;
