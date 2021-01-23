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
  fetchUserOrganizations,
  incrementStep,
  resetState,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsStep,
} from '../selectors';
import { addOrganizationDictionary } from '../stepDictionary';
import {
  AddWrapper,
  AddForm,
  StyledErrorSuccessBanner,
} from './styledComponents';

export class OrganizationsAdd extends React.PureComponent {
  componentDidMount() {
    const { dispatchFetchUserOrganizations, handleIncrementStep } = this.props;
    dispatchFetchUserOrganizations();
    handleIncrementStep({ step: 1, view: 'addOrganization' });
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
      organizationData,
      step,
    } = this.props;
    const isVerify = step === 3;
    const StepToRender = addOrganizationDictionary[step];

    if (importSuccess) {
      handleIncrementStep({ step: 3, view: 'addOrganization' });
    }

    return (
      <AddWrapper>
        <BackNav label="Back to Organizations" path="/organizations" />
        <StyledErrorSuccessBanner
          error={error}
          onClose={handleClearAlerts}
          success={success}
        />
        <AddForm isVerify={isVerify}>
          <AsyncRender
            asyncData={{ organizationData }}
            component={StepToRender}
            loading={loading}
            propsToPassDown={{ importSuccess }}
          />
        </AddForm>
      </AddWrapper>
    );
  }
}

OrganizationsAdd.propTypes = {
  alerts: T.object,
  dispatchFetchUserOrganizations: T.func,
  dispatchResetState: T.func.isRequired,
  handleClearAlerts: T.func,
  handleIncrementStep: T.func,
  importSuccess: T.bool,
  loading: T.bool.isRequired,
  organizationData: T.object,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  alerts: makeSelectOrganizations('alerts'),
  importSuccess: makeSelectOrganizations('importSuccess'),
  loading: makeSelectOrganizationsLoading('addOrganization'),
  organizationData: makeSelectOrganizations('organizationData'),
  step: makeSelectOrganizationsStep('addOrganization'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchFetchUserOrganizations: () => dispatch(fetchUserOrganizations()),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationsAdd);
