import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { importPullRequestDictionary } from '../stepDictionary';

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
import {
  makeSelectPullRequests,
  makeSelectPullRequestsError,
  makeSelectPullRequestsLoading,
} from '../selectors';

import { ImportPullRequestWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
const AddPullRequest = ({
  createError,
  dispatchClearForm,
  dispatchCreatePullRequest,
  dispatchHandleStep,
  dispatchImportPullRequest,
  handleInputChange,
  importData,
  importError,
  importLoading,
  issueId,
  step,
  userId,
}) => {
  const StepToRender = importPullRequestDictionary[step];

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
    <ImportPullRequestWrapper>
      <AsyncRender
        asyncData={[]}
        component={StepToRender}
        loading={importLoading}
        propsToPassDown={{
          createError,
          dispatchClearForm,
          dispatchHandleStep,
          handleImport,
          handleInputChange,
          handleSubmit,
          importData,
          importError,
          importLoading,
        }}
      />
    </ImportPullRequestWrapper>
  );
};

AddPullRequest.propTypes = {
  createError: T.string,
  dispatchClearForm: T.func,
  dispatchCreatePullRequest: T.func,
  dispatchHandleStep: T.func,
  dispatchImportPullRequest: T.func,
  handleInputChange: T.func,
  importData: T.object,
  importError: T.string,
  importLoading: T.bool,
  issueId: T.string,
  step: T.number,
  userId: T.string,
};

const mapStateToProps = createStructuredSelector({
  createError: makeSelectPullRequestsError('createPullRequest'),
  importData: makeSelectPullRequests('importData'),
  importError: makeSelectPullRequestsError('importPullRequest'),
  importLoading: makeSelectPullRequestsLoading('importPullRequest'),
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
