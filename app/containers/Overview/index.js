import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { PrimaryButton } from 'components/base_ui';
import Filter from 'components/Filter';
import SideNav from 'components/SideNav';
import { changeIssueFilter } from 'containers/Issues/actions';
import { changeOrganizationFilter } from 'containers/Organizations/actions';
import { changeUserFilter } from 'containers/Users/actions';
import { makeSelectIssues } from 'containers/Issues/selectors';
import { makeSelectOrganizations } from 'containers/Organizations/selectors';
import { makeSelectUsers } from 'containers/Users/selectors';
import autocompleteDictionary from 'utils/autocompleteDictionary';

import { overviewDirectory } from './helpers';
import {
  ComponentContainer,
  ContentContainer,
  FilterContainer,
  OverviewContainer,
  OverviewHeader,
} from './styledComponents';

const languageOptions = autocompleteDictionary.language;

const Overview = ({
  filterIssueValues,
  filterOrganizationValues,
  filterUserValues,
  handleChangeIssueFilter,
  handleChangeOrganizationFilter,
  handleChangeUserFilter,
  handleNav,
  match: { path },
}) => {
  const formattedPath = path.replace(/^\/+/, '');
  const {
    buttonName,
    Component,
    initialValue,
    route,
    title,
  } = overviewDirectory[formattedPath];
  document.title = title;

  const filterProps = {
    issues: {
      filterValues: filterIssueValues,
      handleChangeFilter: handleChangeIssueFilter,
      languageOptions,
      organizationOptions: [],
    },
    organizations: {
      filterValues: filterOrganizationValues,
      handleChangeFilter: handleChangeOrganizationFilter,
      languageOptions,
      organizationOptions: [],
    },
    users: {
      filterValues: filterUserValues,
      handleChangeFilter: handleChangeUserFilter,
      languageOptions,
      organizationOptions: [],
    },
  };
  return (
    <OverviewContainer>
      <SideNav initialValue={initialValue} handleNav={handleNav} />
      <OverviewHeader>{title}</OverviewHeader>
      <ContentContainer>
        <ComponentContainer>
          <Component />
        </ComponentContainer>

        <FilterContainer>
          <Filter {...filterProps[formattedPath]} />
          <PrimaryButton label={buttonName} onClick={() => handleNav(route)} />
        </FilterContainer>
      </ContentContainer>
    </OverviewContainer>
  );
};

Overview.propTypes = {
  filterIssueValues: T.object,
  filterOrganizationValues: T.object,
  filterUserValues: T.object,
  handleChangeIssueFilter: T.func,
  handleChangeOrganizationFilter: T.func,
  handleChangeUserFilter: T.func,
  handleNav: T.func,
  match: T.object,
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
  /**
   * Reducer : Users
   */
  filterUserValues: makeSelectUsers('filter'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Issues
     */
    handleChangeIssueFilter: payload => dispatch(changeIssueFilter(payload)),
    /*
     * Reducer : Organizations
     */
    handleChangeOrganizationFilter: payload =>
      dispatch(changeOrganizationFilter(payload)),
    /*
     * Reducer : Users
     */
    handleChangeUserFilter: payload => dispatch(changeUserFilter(payload)),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Overview);
