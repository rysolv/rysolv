import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import OrganizationForm from 'components/Issues/Add/OrganizationForm';
import ExistingOrganizations from 'components/Issues/Add/ExistingOrganizations';

import {
  clearOrganization,
  incrementStep,
  inputChange,
  updateOrganization,
} from '../actions';
import {
  makeSelectIssues,
  makeSelectOrganizationsDisabled,
} from '../selectors';
import { ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualOrganization extends React.PureComponent {
  render() {
    const {
      activeUser,
      handleClearOrganization,
      handleIncrementStep,
      handleInputChange,
      handleUpdateOrganization,
      isDisabled,
      organizationData,
    } = this.props;
    const idSelected = organizationData.organizationId.value !== '';
    return (
      <Fragment>
        <StyledH3>Select an Organization</StyledH3>
        <ExistingOrganizations
          activeUser={activeUser}
          organizationData={organizationData}
          handleInputChange={handleInputChange}
          handleUpdateOrganization={handleUpdateOrganization}
          handleClearOrganization={handleClearOrganization}
        />
        <StyledH3>Or create a new Organization</StyledH3>

        <OrganizationForm
          organizationData={organizationData}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => handleIncrementStep({ step: 1, view: 'addIssue' })}
          />
          <PrimaryButton
            disabled={!isDisabled && !idSelected}
            label="Next"
            onClick={() => handleIncrementStep({ step: 3, view: 'addIssue' })}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

ManualOrganization.propTypes = {
  activeUser: T.object,
  handleClearOrganization: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleUpdateOrganization: T.func,
  isDisabled: T.bool,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  organizationData: makeSelectIssues('organizationData'),
  isDisabled: makeSelectOrganizationsDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    handleClearOrganization: payload => dispatch(clearOrganization(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleUpdateOrganization: payload => dispatch(updateOrganization(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualOrganization);
