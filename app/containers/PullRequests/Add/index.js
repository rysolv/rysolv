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
  dispatchCreatePullRequest,
  dispatchHandleStep,
  dispatchImportPullRequest,
  error,
  handleInputChange,
  dispatchClearForm,
  importData,
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
          dispatchHandleStep,
          error,
          handleImport,
          dispatchClearForm,
          handleInputChange,
          handleSubmit,
          importData,
          importLoading,
        }}
      />
    </ImportPullRequestWrapper>
  );
};

AddPullRequest.propTypes = {
  dispatchCreatePullRequest: T.func,
  dispatchHandleStep: T.func,
  dispatchImportPullRequest: T.func,
  error: T.string,
  handleInputChange: T.func,
  dispatchClearForm: T.func,
  importData: T.object,
  importLoading: T.bool,
  issueId: T.string,
  step: T.number,
  userId: T.string,
};

const mapStateToProps = createStructuredSelector({
  step: makeSelectPullRequests('step'),
  error: makeSelectPullRequestsError('importPullRequest'),
  importData: makeSelectPullRequests('importData'),
  importLoading: makeSelectPullRequestsLoading('importPullRequest'),
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
