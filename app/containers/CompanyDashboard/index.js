import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect, withRouter } from 'react-router-dom';

import { makeSelectAuth } from 'containers/Auth/selectors';

import CompanyDashboardView from './CompanyDashboardView';

const CompanyDashboard = ({ activeUser }) => {
  const {
    company: { isContractAccepted, isQuestionnaireComplete } = {},
  } = activeUser;

  if (!isContractAccepted || !isQuestionnaireComplete)
    return <Redirect to="/company/signup" />;
  return <CompanyDashboardView />;
};

CompanyDashboard.propTypes = {
  activeUser: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withRouter(compose(withConnect)(CompanyDashboard));
