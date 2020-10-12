import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearAlerts,
  createPullRequest,
  handleStep,
  importPullRequest,
  inputChange,
  inputError,
  resetState,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectPullRequests } from '../selectors';
import { importPullRequestDictionary } from '../stepDictionary';

const AddPullRequest = ({
  alerts,
  dispatchCreatePullRequest,
  dispatchHandleStep,
  dispatchImportPullRequest,
  dispatchResetState,
  handleClearAlerts,
  handleClose,
  handleInputChange,
  importData,
  issueId,
  loading,
  step,
}) => {
  useEffect(() => dispatchResetState, []);

  const ComponentToRender = importPullRequestDictionary[step];

  const handleImport = () => {
    const { importUrl } = importData;
    dispatchImportPullRequest({
      url: importUrl.value,
      issueId,
    });
  };
  const handleSubmit = () => {
    dispatchCreatePullRequest({ issueId, importData });
  };

  const propsToPassDown = {
    alerts,
    dispatchHandleStep,
    handleClearAlerts,
    handleClose,
    handleImport,
    handleInputChange,
    handleSubmit,
    importData,
    loading,
  };

  return <ComponentToRender {...propsToPassDown} />;
};

AddPullRequest.propTypes = {
  alerts: T.object.isRequired,
  dispatchCreatePullRequest: T.func,
  dispatchHandleStep: T.func,
  dispatchImportPullRequest: T.func,
  dispatchResetState: T.func.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleClose: T.func,
  handleInputChange: T.func,
  importData: T.object,
  issueId: T.string,
  loading: T.bool,
  step: T.number,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : PullRequests
   */
  alerts: makeSelectPullRequests('alerts'),
  importData: makeSelectPullRequests('importData'),
  loading: makeSelectPullRequests('loading'),
  step: makeSelectPullRequests('step'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : PullRequests
     */
    dispatchCreatePullRequest: payload => dispatch(createPullRequest(payload)),
    dispatchHandleStep: payload => dispatch(handleStep(payload)),
    dispatchImportPullRequest: payload => dispatch(importPullRequest(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pullRequests', reducer });
const withSaga = injectSaga({ key: 'pullRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddPullRequest);
