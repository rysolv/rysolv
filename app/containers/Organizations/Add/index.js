import React, { Fragment } from 'react';
import T from 'prop-types';
import { BackNav } from 'components/base_ui';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';

import { incrementStep, clearForm } from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsStep,
} from '../selectors';
import { addOrganizationDictionary } from '../stepDictionary';
import { AddWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class AddOrganization extends React.PureComponent {
  componentDidMount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addOrganization' });
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const { data, loading, step, handleNav } = this.props;

    const StepToRender = addOrganizationDictionary[step];
    return (
      <Fragment>
        <BackNav
          label="Back to Organizations"
          handleNav={handleNav}
          path="/admin/organizations"
        />
        <AddWrapper>
          <AsyncRender
            asyncData={{ data }}
            component={StepToRender}
            loading={loading}
          />
        </AddWrapper>
      </Fragment>
    );
  }
}

AddOrganization.propTypes = {
  data: T.object,
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  handleNav: T.func,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  data: makeSelectOrganizations('data'),
  loading: makeSelectOrganizationsLoading('addOrganization'),
  step: makeSelectOrganizationsStep('addOrganization'),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddOrganization);
