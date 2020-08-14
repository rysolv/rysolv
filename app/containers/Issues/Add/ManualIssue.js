import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Issues/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import { makeSelectIssues, makeSelectIssuesDisabled } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  SelectedOrganization,
  StyledFocusDiv,
  StyledH3,
  StyledLink,
  VerifyWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
const ManualIssue = ({
  handleIncrementStep,
  handleInputChange,
  isDisabled,
  issueData,
  organizationData,
}) => {
  useEffect(() => document.getElementById('issue-manual').focus(), []);

  const handleKeypress = e => {
    if (e.which === 13 && isDisabled) {
      handleIncrementStep({ step: 4, view: 'addIssue' });
    }
  };
  return (
    <StyledFocusDiv
      id="issue-manual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Organization</StyledH3>
      <VerifyWrapper>
        <SelectedOrganization>
          {organizationData.organizationName.value}
        </SelectedOrganization>
        <StyledLink
          href={`//${organizationData.organizationRepo.value}`}
          target="_blank"
        >
          {organizationData.organizationRepo.value}
        </StyledLink>
      </VerifyWrapper>
      <StyledH3>Add Issue</StyledH3>
      <ManualForm handleInputChange={handleInputChange} issueData={issueData} />
      <ButtonGroup>
        <BackLink
          onClick={() => handleIncrementStep({ step: 2, view: 'addIssue' })}
        >
          Edit Org
        </BackLink>
        <PrimaryButton
          disabled={!isDisabled}
          label="Preview Issue"
          onClick={() => handleIncrementStep({ step: 4, view: 'addIssue' })}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ManualIssue.propTypes = {
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  issueData: T.object,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  isDisabled: makeSelectIssuesDisabled(),
  issueData: makeSelectIssues('issueData'),
  organizationData: makeSelectIssues('organizationData'),
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
)(ManualIssue);
