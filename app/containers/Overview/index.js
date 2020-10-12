import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Filter from 'components/Filter';
import SearchHeader from 'components/SearchHeader';
import {
  changeIssueFilter,
  changeIssueSearch,
} from 'containers/Issues/actions';
import {
  changeOrganizationFilter,
  changeOrganizationSearch,
} from 'containers/Organizations/actions';
import { changeUserFilter, changeUserSearch } from 'containers/Users/actions';
import { makeSelectIssues } from 'containers/Issues/selectors';
import { makeSelectOrganizations } from 'containers/Organizations/selectors';
import { makeSelectUsers } from 'containers/Users/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import autocompleteDictionary from 'utils/autocompleteDictionary';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchOrganizationOptions, resetState } from './actions';
import { overviewDirectory } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectOrganizationOptions } from './selectors';
import {
  ComponentContainer,
  ContentContainer,
  FilterContainer,
  OverviewContainer,
  OverviewHeader,
} from './styledComponents';

const languageOptions = autocompleteDictionary.language;

const Overview = ({
  deviceView,
  dispatchFetchOrganizationOptions,
  dispatchResetState,
  filterIssueValues,
  filterOrganizationValues,
  filterUserValues,
  handleChangeIssueFilter,
  handleChangeIssueSearch,
  handleChangeOrganizationFilter,
  handleChangeOrganizationSearch,
  handleChangeUserFilter,
  handleChangeUserSearch,
  match: { params, path },
  organizationOptions,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchFetchOrganizationOptions();
    return dispatchResetState;
  }, []);
  const formattedPath = path.split('/')[1];
  const { Component, title } = overviewDirectory[formattedPath];
  document.title = title;
  const filterProps = {
    issues: {
      filterValues: filterIssueValues,
      handleChangeFilter: handleChangeIssueFilter,
      languageOptions,
      organizationOptions,
    },
    organizations: {
      filterValues: filterOrganizationValues,
      handleChangeFilter: handleChangeOrganizationFilter,
      languageOptions,
      organizationOptions,
    },
    users: {
      filterValues: filterUserValues,
      handleChangeFilter: handleChangeUserFilter,
      languageOptions,
      organizationOptions,
    },
  };
  const headerProps = {
    issues: {
      handleChangeFilter: handleChangeIssueFilter,
      handleChangeSearch: handleChangeIssueSearch,
      overviewFilter: filterIssueValues.overview,
      placeholder: 'Find an issue...',
      values: ['Newest', 'Most Funded', 'Most Popular'],
    },
    organizations: {
      handleChangeFilter: handleChangeOrganizationFilter,
      handleChangeSearch: handleChangeOrganizationSearch,
      overviewFilter: filterOrganizationValues.overview,
      placeholder: 'Find an organization...',
      values: ['Newest', 'Most Funded'],
    },
    users: {
      handleChangeFilter: handleChangeUserFilter,
      handleChangeSearch: handleChangeUserSearch,
      overviewFilter: filterUserValues.overview,
      placeholder: 'Find a user...',
      values: ['Newest', 'Most Credit'],
    },
  };
  const isMobile =
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  return (
    <OverviewContainer>
      <OverviewHeader>{title}</OverviewHeader>
      <ContentContainer>
        <ComponentContainer>
          <SearchHeader {...headerProps[formattedPath]} />
          <Component params={params} />
        </ComponentContainer>

        <FilterContainer>
          <Filter isMobile={isMobile} {...filterProps[formattedPath]} />
        </FilterContainer>
      </ContentContainer>
    </OverviewContainer>
  );
};

Overview.propTypes = {
  deviceView: T.string.isRequired,
  dispatchFetchOrganizationOptions: T.func,
  dispatchResetState: T.func.isRequired,
  filterIssueValues: T.object,
  filterOrganizationValues: T.object,
  filterUserValues: T.object,
  handleChangeIssueFilter: T.func,
  handleChangeIssueSearch: T.func,
  handleChangeOrganizationFilter: T.func,
  handleChangeOrganizationSearch: T.func,
  handleChangeUserFilter: T.func,
  handleChangeUserSearch: T.func,
  match: T.object,
  organizationOptions: T.array,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  filterIssueValues: makeSelectIssues('filter'),
  /**
   * Reducer : Organizations
   */
  filterOrganizationValues: makeSelectOrganizations('filter'),
  /*
   * Reducer : Overview
   */
  organizationOptions: makeSelectOrganizationOptions(),
  /**
   * Reducer : Users
   */
  filterUserValues: makeSelectUsers('filter'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Issues
     */
    handleChangeIssueFilter: payload => dispatch(changeIssueFilter(payload)),
    handleChangeIssueSearch: payload => dispatch(changeIssueSearch(payload)),
    /*
     * Reducer : Organizations
     */
    handleChangeOrganizationFilter: payload =>
      dispatch(changeOrganizationFilter(payload)),
    handleChangeOrganizationSearch: payload =>
      dispatch(changeOrganizationSearch(payload)),
    /*
     * Reducer : Overview
     */
    dispatchFetchOrganizationOptions: () =>
      dispatch(fetchOrganizationOptions()),
    dispatchResetState: () => dispatch(resetState()),
    /*
     * Reducer : Users
     */
    handleChangeUserFilter: payload => dispatch(changeUserFilter(payload)),
    handleChangeUserSearch: payload => dispatch(changeUserSearch(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'overview', reducer });
const withSaga = injectSaga({ key: 'overview', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Overview);
