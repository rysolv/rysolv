import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import OrganizationForm from 'components/Issues/Add/OrganizationForm';
import ExistingOrganizations from 'components/Issues/Add/ExistingOrganizations';

import {
  clearOrganization,
  incrementStep,
  inputChange,
  updateIsManual,
  updateOrganization,
} from '../actions';
import {
  makeSelectIssues,
  makeSelectOrganizationsDisabled,
} from '../selectors';
import { BackLink, ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualOrganization extends React.PureComponent {
  componentDidMount() {
    const { dispatchUpdateIsManual } = this.props;
    dispatchUpdateIsManual({ value: true });
  }

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
          <BackLink
            onClick={() => handleIncrementStep({ step: 1, view: 'addIssue' })}
          >
            Back
          </BackLink>
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
  dispatchUpdateIsManual: T.func,
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
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
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
