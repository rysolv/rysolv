import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CompanyRecruitmentView from 'components/CompanyRecruitment';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { resetForm, sendForm } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCompanyRecruitment } from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyRecruitment = ({
  dispatchResetForm,
  dispatchSendForm,
  error,
  loading,
  success,
}) => (
  <ViewContainer>
    <CompanyRecruitmentView
      dispatchResetForm={dispatchResetForm}
      dispatchSendForm={dispatchSendForm}
      error={error}
      loading={loading}
      success={success}
    />
  </ViewContainer>
);

CompanyRecruitment.propTypes = {
  dispatchResetForm: T.func.isRequired,
  dispatchSendForm: T.func.isRequired,
  error: T.bool.isRequired,
  loading: T.bool.isRequired,
  success: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyRecruitment
   */
  error: makeSelectCompanyRecruitment('error'),
  loading: makeSelectCompanyRecruitment('loading'),
  success: makeSelectCompanyRecruitment('success'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyRecruitment
   */
  dispatchResetForm: () => dispatch(resetForm()),
  dispatchSendForm: payload => dispatch(sendForm(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companyRecruitment', reducer });
const withSaga = injectSaga({ key: 'companyRecruitment', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(CompanyRecruitment),
);
