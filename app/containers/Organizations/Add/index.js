import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { BackNav } from 'components/base_ui';
import { makeSelectAuth } from 'containers/Auth/selectors';
import AsyncRender from 'components/AsyncRender';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { incrementStep, clearForm } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsStep,
} from '../selectors';
import { addOrganizationDictionary } from '../stepDictionary';
import { AddWrapper, AddForm } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class OrganizationsAdd extends React.PureComponent {
  componentDidMount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addOrganization' });
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
      handleNav,
      importSuccess,
      loading,
      organizationData,
      step,
    } = this.props;

    const StepToRender = addOrganizationDictionary[step];
    if (importSuccess) {
      handleIncrementStep({ step: 3, view: 'addOrganization' });
    }
    return (
      <AddWrapper>
        <BackNav
          label="Back to Organizations"
          handleNav={handleNav}
          path="/organizations"
        />
        <AddForm>
          <AsyncRender
            asyncData={{ organizationData }}
            component={StepToRender}
            loading={loading}
            propsToPassDown={{
              activeUser,
              handleNav,
              importSuccess,
            }}
          />
        </AddForm>
      </AddWrapper>
    );
  }
}

OrganizationsAdd.propTypes = {
  activeUser: T.object,
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  handleNav: T.func,
  importSuccess: T.bool,
  loading: T.bool.isRequired,
  organizationData: T.object,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  loading: makeSelectOrganizationsLoading('addOrganization'),
  organizationData: makeSelectOrganizations('organizationData'),
  step: makeSelectOrganizationsStep('addOrganization'),
  activeUser: makeSelectAuth('activeUser'),
  importSuccess: makeSelectOrganizations('importSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchClearForm: () => dispatch(clearForm()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleNav: route => dispatch(push(route)),
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
