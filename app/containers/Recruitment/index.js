import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import RecruitmentView from 'components/Recruitment';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { submitEmail } from './actions';
import reducer from './reducer';
import saga from './saga';

const Recruitment = ({ dispatchSubmitEmail, error, loading }) => (
  <RecruitmentView
    dispatchSubmitEmail={dispatchSubmitEmail}
    error={error}
    loading={loading}
  />
);

Recruitment.propTypes = {
  dispatchSubmitEmail: T.func.isRequired,
  error: T.string,
  loading: T.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Recruitment
     */
    dispatchSubmitEmail: payload => dispatch(submitEmail(payload)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'recruitment', reducer });
const withSaga = injectSaga({ key: 'recruitment', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Recruitment);
