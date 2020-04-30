import React, { Fragment } from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import IssueCard from './IssueCard';
import IssueFilter from './IssueFilter';
import {
  BannerWrapper,
  IssueCardWrapper,
  IssuesWrapper,
} from './styledComponents';

const Issues = ({
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleDeleteIssue,
  activeUser,
  handleIncrement,
  // handleFetchInfo,
  handleInputChange,
  handleNav,
  handleSearchIssues,
  handleUpvote,
  search,
}) => {
  const hasData = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    activeUser,
    data,
    handleDeleteIssue,
    handleUpvote,
    handleIncrement,
    // handleFetchInfo,
    handleNav,
  };
  const route = '/admin/issues/add';
  const viewToRender = hasData ? (
    <IssueCardWrapper>
      <IssueCard {...propsToPassDown} />
    </IssueCardWrapper>
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <BannerWrapper>
        <AdminSubHeader
          disabled={disabled}
          handleInputChange={handleInputChange}
          handleNav={handleNav}
          handleSearch={handleSearchIssues}
          route={route}
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <IssuesWrapper>
        <IssueFilter />
        {viewToRender}
      </IssuesWrapper>
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
  // handleFetchInfo: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  search: T.object,
};

export default Issues;
