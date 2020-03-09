import React from 'react';
import T from 'prop-types';
import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ConditionalRender, ErrorSuccessBanner } from 'components/base_ui';
import EmptyCard from './EmptyCard';
import CompanyCard from './CompanyCard';
import { BannerWrapper } from './styledComponents';

const Companies = ({
  alerts: { error, success },
  clearAlerts,
  data,
  handleFetchInfo,
  handleInputChange,
  handleNav,
  handleSearchCompanies,
  search,
}) => {
  const hasCompanies = data.length > 0 && !data.includes(null);
  const propsToPassDown = { data, handleFetchInfo, handleNav };
  const CompanyComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader
          handleInputChange={handleInputChange}
          handleNav={handleNav}
          handleSearchCompanies={handleSearchCompanies}
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <CompanyCard {...propsToPassDown} />
    </div>
  );
  const EmptyComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader
          handleInputChange={handleInputChange}
          handleNav={handleNav}
          handleSearchCompanies={handleSearchCompanies}
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <EmptyCard />
    </div>
  );
  return (
    <ConditionalRender
      Component={CompanyComponent}
      FallbackComponent={EmptyComponent}
      shouldRender={hasCompanies}
    />
  );
};

Companies.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  handleFetchInfo: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchCompanies: T.func,
  search: T.object,
};

export default Companies;
