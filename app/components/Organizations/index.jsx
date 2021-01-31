import React, { Fragment } from 'react';
import T from 'prop-types';

import { Pagination } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import OrganizationCard from './Card';
import { StyledErrorSuccessBanner } from './styledComponents';

const Organizations = ({
  alerts: { error, success },
  data,
  handleClearAlerts,
  handleNav,
  path,
}) => {
  const hasOrganizations = data.length > 0 && !data.includes(null);
  const propsToPassDown = { data, handleNav, path };
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
        onClose={handleClearAlerts}
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
  data: T.array.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleNav: T.func.isRequired,
  path: T.string.isRequired,
};

export default Organizations;
