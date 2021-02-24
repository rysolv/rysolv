import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { BackNav } from 'components/base_ui';
import AsyncRender from 'components/AsyncRender';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  fetchUserRepos,
  incrementStep,
  resetState,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectRepos,
  makeSelectReposLoading,
  makeSelectReposStep,
} from '../selectors';
import { addRepoDictionary } from '../stepDictionary';
import {
  AddWrapper,
  AddForm,
  StyledErrorSuccessBanner,
} from './styledComponents';

export class ReposAdd extends React.PureComponent {
  componentDidMount() {
    document.title = 'Add Repo';
    const { dispatchFetchUserRepos, handleIncrementStep } = this.props;
    dispatchFetchUserRepos();
    handleIncrementStep({ step: 1, view: 'addRepo' });
  }

  componentWillUnmount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  render() {
    window.scrollTo(0, 0);

    const {
      alerts: { error, success },
      handleClearAlerts,
      handleIncrementStep,
      importSuccess,
      loading,
      repoData,
      step,
    } = this.props;
    const isVerify = step === 3;
    const StepToRender = addRepoDictionary[step];

    if (importSuccess) {
      handleIncrementStep({ step: 3, view: 'addRepo' });
    }

    return (
      <AddWrapper>
        <BackNav label="Back to Repos" path="/repos" />
        <StyledErrorSuccessBanner
          error={error}
          onClose={handleClearAlerts}
          success={success}
        />
        <AddForm isVerify={isVerify}>
          <AsyncRender
            asyncData={{ repoData }}
            component={StepToRender}
            loading={loading}
            propsToPassDown={{ importSuccess }}
          />
        </AddForm>
      </AddWrapper>
    );
  }
}

ReposAdd.propTypes = {
  alerts: T.object,
  dispatchFetchUserRepos: T.func,
  dispatchResetState: T.func.isRequired,
  handleClearAlerts: T.func,
  handleIncrementStep: T.func,
  importSuccess: T.bool,
  loading: T.bool.isRequired,
  repoData: T.object,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Repos
   */
  alerts: makeSelectRepos('alerts'),
  importSuccess: makeSelectRepos('importSuccess'),
  loading: makeSelectReposLoading('addRepo'),
  repoData: makeSelectRepos('repoData'),
  step: makeSelectReposStep('addRepo'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Repos
     */
    dispatchFetchUserRepos: () => dispatch(fetchUserRepos()),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'repos', reducer });
const withSaga = injectSaga({ key: 'repos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReposAdd);
