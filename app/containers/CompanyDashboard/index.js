import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CompanyDashboardView from 'components/CompanyDashboard';
import injectReducer from 'utils/injectReducer';

import { saveCandidate } from './actions';
import reducer from './reducer';
import { makeSelectCompanyDashboardCandidates } from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyDashboard = ({ candidates, dispatchSaveCandidate }) => (
  <ViewContainer>
    <CompanyDashboardView
      candidates={candidates}
      dispatchSaveCandidate={dispatchSaveCandidate}
    />
  </ViewContainer>
);

CompanyDashboard.propTypes = {
  candidates: T.array.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyDashboard
   */
  candidates: makeSelectCompanyDashboardCandidates(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyDashboard
   */
  dispatchSaveCandidate: payload => dispatch(saveCandidate(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'companyDashboard', reducer });

export default withRouter(
  compose(
    withReducer,
    withConnect,
  )(CompanyDashboard),
);
