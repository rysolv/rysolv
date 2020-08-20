import React, { Fragment } from 'react';
import T from 'prop-types';

import { Pagination } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import OrganizationCard from './Card';
import { StyledErrorSuccessBanner } from './styledComponents';

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
    <Pagination
      Component={OrganizationCard}
      propsToPassDown={propsToPassDown}
    />
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <StyledErrorSuccessBanner
        error={error}
        onClose={clearAlerts}
        success={success}
      />
      {viewToRender}
    </Fragment>
  );
};

Organizations.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }).isRequired,
  clearAlerts: T.func.isRequired,
  data: T.array.isRequired,
  handleNav: T.func.isRequired,
};

export default Organizations;
