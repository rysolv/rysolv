import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import CompanyCard from './CompanyCard';
import { BannerWrapper } from './styledComponents';

const Companies = ({
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleDeleteCompany,
  handleFetchInfo,
  handleInputChange,
  handleNav,
  handleSearchCompanies,
  search,
}) => {
  const hasCompanies = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    handleDeleteCompany,
    handleFetchInfo,
    handleNav,
  };
  const viewToRender = hasCompanies ? (
    <CompanyCard {...propsToPassDown} />
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
          handleSearch={handleSearchCompanies}
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
  );
};

Companies.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  disabled: T.bool.isRequired,
  handleDeleteCompany: T.func,
  handleFetchInfo: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchCompanies: T.func,
  search: T.object,
};

export default Companies;
