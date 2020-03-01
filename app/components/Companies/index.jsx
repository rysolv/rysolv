import React from 'react';
import T from 'prop-types';
import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ConditionalRender, ErrorSuccessBanner } from 'components/base_ui';
import ViewCompanies from 'components/Companies/ViewCompanies';
import { BannerWrapper } from './styledComponents';

const CompanyCard = ({
  alerts: { error, success },
  clearAlerts,
  data,
  handleDelete,
  handleNav,
}) => {
  const hasCompanies = data.length > 0;
  const propsToPassDown = { data, handleDelete, handleNav };
  const CompanyCardComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader handleNav={handleNav} />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <ViewCompanies {...propsToPassDown} />
    </div>
  );
  return (
    <ConditionalRender
      Component={CompanyCardComponent}
      FallbackComponent={<div>Hello</div>}
      shouldRender={hasCompanies}
    />
  );
};

CompanyCard.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  handleDelete: T.func,
  handleNav: T.func,
};

export default CompanyCard;
