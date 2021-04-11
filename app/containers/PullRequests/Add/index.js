import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearAlerts,
  createPullRequest,
  fetchGithubPullRequests,
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
  activeUser: { isGithubVerified },
  alerts,
  dispatchCreatePullRequest,
  dispatchFetchGithubPullRequests,
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
  userPullRequests,
  userPullRequestsLoading,
}) => {
  useEffect(() => {
    if (isGithubVerified) {
      dispatchFetchGithubPullRequests({ issueId });
    }
    return dispatchResetState;
  }, []);

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
    userPullRequests,
    userPullRequestsLoading,
  };

  return <ComponentToRender {...propsToPassDown} />;
};

AddPullRequest.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  dispatchCreatePullRequest: T.func.isRequired,
  dispatchFetchGithubPullRequests: T.func.isRequired,
  dispatchHandleStep: T.func.isRequired,
  dispatchImportPullRequest: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleClose: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  importData: T.object.isRequired,
  issueId: T.string.isRequired,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
  userPullRequests: T.array.isRequired,
  userPullRequestsLoading: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : PullRequests
   */
  alerts: makeSelectPullRequests('alerts'),
  importData: makeSelectPullRequests('importData'),
  loading: makeSelectPullRequests('loading'),
  step: makeSelectPullRequests('step'),
  userPullRequests: makeSelectPullRequests('userPullRequests'),
  userPullRequestsLoading: makeSelectPullRequests('userPullRequestsLoading'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : PullRequests
     */
    dispatchCreatePullRequest: payload => dispatch(createPullRequest(payload)),
    dispatchFetchGithubPullRequests: payload =>
      dispatch(fetchGithubPullRequests(payload)),
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
