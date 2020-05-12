import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import OrganizationForm from 'components/Issues/Add/OrganizationForm';
import ExistingOrganizations from 'components/Issues/Add/ExistingOrganizations';

import { incrementStep, inputChange } from '../actions';
import {
  makeSelectIssues,
  makeSelectOrganizationsDisabled,
} from '../selectors';
import { ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualOrganization extends React.PureComponent {
  render() {
    const {
      organization,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Select an Organization</StyledH3>
        <ExistingOrganizations />
        <StyledH3>Or create a new Organization</StyledH3>

        <OrganizationForm
          organization={organization}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => handleIncrementStep({ step: 1, view: 'addIssue' })}
          />
          <PrimaryButton
            disabled={!isDisabled}
            label="Next"
            onClick={() => handleIncrementStep({ step: 3, view: 'addIssue' })}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

ManualOrganization.propTypes = {
  organization: T.object,
  handleIncrementStep: T.func,
  isDisabled: T.bool,
  handleInputChange: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  organization: makeSelectIssues('organizationData'),
  isDisabled: makeSelectOrganizationsDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualOrganization);
