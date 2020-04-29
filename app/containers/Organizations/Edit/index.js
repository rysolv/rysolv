import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';

import { incrementStep } from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsStep,
} from '../selectors';
import { editOrganizationDictionary } from '../stepDictionary';
import { EditWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class EditOrganization extends React.PureComponent {
  componentDidMount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'editOrganization' });
  }

  render() {
    const { data, loading, step } = this.props;

    const StepToRender = editOrganizationDictionary[step];
    return (
      <EditWrapper>
        <AsyncRender
          asyncData={{ data }}
          component={StepToRender}
          loading={loading}
        />
      </EditWrapper>
    );
  }
}

EditOrganization.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  data: makeSelectOrganizations('data'),
  loading: makeSelectOrganizationsLoading('fetchOrganization'),
  step: makeSelectOrganizationsStep('editOrganization'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditOrganization);
