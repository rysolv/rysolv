import React, { Fragment } from 'react';
import T from 'prop-types';

import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import OrganizationCard from './Card';
import { BannerWrapper } from './styledComponents';

const Organizations = ({
  alerts: { error, success },
  clearAlerts,
  data,

  handleNav,
}) => {
  const hasOrganizations = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    handleNav,
  };
  const viewToRender = hasOrganizations ? (
    <OrganizationCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <BannerWrapper>
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      {viewToRender}
    </Fragment>
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
