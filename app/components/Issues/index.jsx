import React, { Fragment } from 'react';
import T from 'prop-types';

import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import IssueCard from './Card';
import { BannerWrapper } from './styledComponents';

const Issues = ({
  activeUser,
  alerts: { error, success },
  clearAlerts,
  data,
  handleDeleteIssue,
  handleIncrement,
  handleNav,
  handleUpvote,
}) => {
  const hasData = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    activeUser,
    data,
    handleDeleteIssue,
    handleIncrement,
    handleNav,
    handleUpvote,
  };
  const viewToRender = hasData ? (
    <IssueCard {...propsToPassDown} />
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

Issues.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  disabled: T.bool.isRequired,
  handleIncrement: T.func,
  handleDeleteIssue: T.func,
  handleUpvote: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  search: T.object,
};

export default Issues;
