import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import { BackNav } from 'components/base_ui';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectOrganizations } from 'containers/Organizations/selectors';
import { searchOrganizations } from 'containers/Auth/actions';
import { incrementStep, clearForm } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectIssues,
  makeSelectIssuesLoading,
  makeSelectIssuesStep,
} from '../selectors';
import { addIssueDictionary } from '../stepDictionary';
import { AddWrapper, AddForm } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class IssuesAdd extends React.PureComponent {
  componentDidMount() {
    document.title = 'Add Issue';
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addIssue' });
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    window.scrollTo(0, 0);

    const {
      activeUser,
      handleIncrementStep,
      importSuccess,
      issueData,
      loading,
      organization,
      step,
    } = this.props;
    const StepToRender = addIssueDictionary[step];

    if (importSuccess) {
      handleIncrementStep({ step: 4, view: 'addIssue' });
    }

    return (
      <AddWrapper>
        <BackNav label="Back to Issues" path="/issues" />
        <AddForm>
          <AsyncRender
            asyncData={{ issueData, organization }}
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
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  importSuccess: T.bool,
  issueData: T.object,
  loading: T.bool.isRequired,
  organization: T.object,
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
  importSuccess: makeSelectIssues('importSuccess'),
  issueData: makeSelectIssues('issueData'),
  loading: makeSelectIssuesLoading('addIssue'),
  step: makeSelectIssuesStep('addIssue'),
  /**
   * Reducer : Organizations
   */
  organizationData: makeSelectOrganizations('organizationData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchClearForm: () => dispatch(clearForm()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleSearchOrganizations: payload =>
      dispatch(searchOrganizations(payload)),
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
