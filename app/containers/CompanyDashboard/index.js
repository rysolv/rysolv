import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CompanyDashboardView from 'components/CompanyDashboard';

import { makeSelectCompanyDashboard } from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyDashboard = ({ candidates }) => (
  <ViewContainer>
    <CompanyDashboardView candidates={candidates} />
  </ViewContainer>
);

CompanyDashboard.propTypes = { candidates: T.array.isRequired };

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  candidates: makeSelectCompanyDashboard('candidates'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withRouter(compose(withConnect)(CompanyDashboard));
