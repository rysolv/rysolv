import React, { useEffect } from 'react';
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
import {
  BackLink,
  ButtonGroup,
  StyledFocusDiv,
  StyledH3,
} from './styledComponents';

const ManualOrganization = ({
  activeUser,
  dispatchUpdateIsManual,
  handleClearOrganization,
  handleIncrementStep,
  handleInputChange,
  handleUpdateOrganization,
  isDisabled,
  organizationData,
}) => {
  useEffect(() => {
    dispatchUpdateIsManual({ value: true });
    document.getElementById('issue-org-manual').focus();
  }, []);

  const idSelected = organizationData.organizationId.value !== '';

  const handleKeypress = ({ keyCode, which }) => {
    if ((keyCode === 13 || which === 13 || 0) && idSelected) {
      handleIncrementStep({ step: 3, view: 'addIssue' });
    }
  };
  return (
    <StyledFocusDiv
      id="issue-org-manual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Select an Organization</StyledH3>
      <ExistingOrganizations
        activeUser={activeUser}
        handleClearOrganization={handleClearOrganization}
        handleInputChange={handleInputChange}
        handleUpdateOrganization={handleUpdateOrganization}
        organizationData={organizationData}
      />
      <StyledH3>Or create a new Organization</StyledH3>

      <OrganizationForm
        handleInputChange={handleInputChange}
        organizationData={organizationData}
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
    </StyledFocusDiv>
  );
};

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
  isDisabled: makeSelectOrganizationsDisabled(),
  organizationData: makeSelectIssues('organizationData'),
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
