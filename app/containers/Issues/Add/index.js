import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { BackNav } from 'components/base_ui';
import { makeSelectActiveUser } from 'containers/Auth/selectors';
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
    window.scrollTo(0, 0);
    document.title = 'Add Issue';
    const {
      activeUser,
      handleIncrementStep,
      handleSearchOrganizations,
    } = this.props;
    const { id } = activeUser;
    handleSearchOrganizations({ id });
    handleIncrementStep({ step: 1, view: 'addIssue' });
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const {
      activeUser,
      data,
      handleNav,
      loading,
      organization,
      step,
    } = this.props;
    const StepToRender = addIssueDictionary[step];
    return (
      <AddWrapper>
        <BackNav label="Back to Issues" handleNav={handleNav} path="/issues" />
        <AddForm>
          <AsyncRender
            asyncData={{ data, organization }}
            component={StepToRender}
            loading={loading}
            propsToPassDown={{
              activeUser,
              handleNav,
            }}
          />
        </AddForm>
      </AddWrapper>
    );
  }
}

IssuesAdd.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  handleNav: T.func,
  handleSearchOrganizations: T.func,
  loading: T.bool.isRequired,
  organization: T.object,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  activeUser: makeSelectActiveUser('activeUser'),
  data: makeSelectIssues('data'),
  organization: makeSelectOrganizations('data'),
  loading: makeSelectIssuesLoading('addIssue'),
  step: makeSelectIssuesStep('addIssue'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchClearForm: () => dispatch(clearForm()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleNav: route => dispatch(push(route)),
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
