import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import { BackNav } from 'components/base_ui';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { makeSelectRepos } from 'containers/Organizations/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  fetchUserIssues,
  incrementStep,
  resetState,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectIssues,
  makeSelectIssuesLoading,
  makeSelectIssuesStep,
} from '../selectors';
import { addIssueDictionary } from '../stepDictionary';
import {
  AddForm,
  AddWrapper,
  StyledErrorSuccessBanner,
} from './styledComponents';

export class IssuesAdd extends React.PureComponent {
  componentDidMount() {
    document.title = 'Add Issue';
    const {
      activeUser: { isGithubVerified },
      dispatchFetchUserIssues,
      handleIncrementStep,
    } = this.props;

    if (isGithubVerified) {
      dispatchFetchUserIssues();
    }

    handleIncrementStep({ step: 1, view: 'addIssue' });
  }

  componentWillUnmount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  render() {
    window.scrollTo(0, 0);

    const {
      activeUser,
      alerts: { error, success },
      handleClearAlerts,
      handleIncrementStep,
      importSuccess,
      issueData,
      loading,
      step,
    } = this.props;
    const isVerify = step === 4;
    const StepToRender = addIssueDictionary[step];

    if (importSuccess) {
      handleIncrementStep({ step: 4, view: 'addIssue' });
    }

    return (
      <AddWrapper>
        <BackNav label="Back to Issues" path="/issues" />
        <StyledErrorSuccessBanner
          error={error}
          onClose={handleClearAlerts}
          success={success}
        />
        <AddForm isVerify={isVerify}>
          <AsyncRender
            asyncData={{ issueData }}
            component={StepToRender}
            loading={loading}
            propsToPassDown={{
              activeUser,
              importSuccess,
            }}
          />
        </AddForm>
      </AddWrapper>
    );
  }
}

IssuesAdd.propTypes = {
  activeUser: T.object,
  alerts: T.object,
  dispatchFetchUserIssues: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  handleClearAlerts: T.func,
  handleIncrementStep: T.func,
  importSuccess: T.bool,
  issueData: T.object,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Issues
   */
  alerts: makeSelectIssues('alerts'),
  importSuccess: makeSelectIssues('importSuccess'),
  issueData: makeSelectIssues('issueData'),
  loading: makeSelectIssuesLoading('addIssue'),
  step: makeSelectIssuesStep('addIssue'),
  /**
   * Reducer : Repos
   */
  repoData: makeSelectRepos('repoData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchFetchUserIssues: () => dispatch(fetchUserIssues()),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuesAdd);
