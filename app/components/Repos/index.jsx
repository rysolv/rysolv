import React, { Fragment } from 'react';
import T from 'prop-types';

import { Pagination } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import RepoCard from './Card';
import { StyledErrorSuccessBanner } from './styledComponents';

const Repos = ({
  alerts: { error, success },
  data,
  handleClearAlerts,
  handleNav,
  path,
}) => {
  const hasRepos = data.length > 0 && !data.includes(null);
  const propsToPassDown = { data, handleNav, path };
  const viewToRender = hasRepos ? (
    <Pagination Component={RepoCard} propsToPassDown={propsToPassDown} />
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

Repos.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }).isRequired,
  data: T.array.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleNav: T.func.isRequired,
  path: T.string.isRequired,
};

export default Repos;
