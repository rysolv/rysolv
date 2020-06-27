import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearForm,
  createPullRequest,
  handleStep,
  importPullRequest,
  inputChange,
  inputError,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectPullRequests } from '../selectors';
import { importPullRequestDictionary } from '../stepDictionary';

const AddPullRequest = ({
  dispatchClearForm,
  dispatchCreatePullRequest,
  dispatchHandleStep,
  dispatchImportPullRequest,
  error,
  handleInputChange,
  importData,
  issueId,
  loading,
  step,
  userId,
}) => {
  const ComponentToRender = importPullRequestDictionary[step];

  const handleImport = () => {
    const { importUrl } = importData;
    dispatchImportPullRequest({
      url: importUrl.value,
    });
  };
  const handleSubmit = () => {
    dispatchCreatePullRequest({ issueId, userId, importData });
  };
  return (
    <AsyncRender
      asyncData={{}}
      component={ComponentToRender}
      loading={loading}
      propsToPassDown={{
        dispatchClearForm,
        dispatchHandleStep,
        error,
        handleImport,
        handleInputChange,
        handleSubmit,
        importData,
        loading,
      }}
    />
  );
};

AddPullRequest.propTypes = {
  dispatchClearForm: T.func,
  dispatchCreatePullRequest: T.func,
  dispatchHandleStep: T.func,
  dispatchImportPullRequest: T.func,
  error: T.oneOfType([T.bool, T.string]),
  handleInputChange: T.func,
  importData: T.object,
  issueId: T.string,
  loading: T.bool,
  step: T.number,
  userId: T.string,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : PullRequests
   */
  error: makeSelectPullRequests('error'),
  importData: makeSelectPullRequests('importData'),
  loading: makeSelectPullRequests('loading'),
  step: makeSelectPullRequests('step'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : PullRequests
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchCreatePullRequest: payload => dispatch(createPullRequest(payload)),
    dispatchHandleStep: payload => dispatch(handleStep(payload)),
    dispatchImportPullRequest: payload => dispatch(importPullRequest(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
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
