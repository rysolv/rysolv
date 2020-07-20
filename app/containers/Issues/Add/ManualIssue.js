import React, { Fragment } from 'react';
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
  StyledLink,
  SelectedOrganization,
  StyledH3,
  VerifyWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualIssue extends React.PureComponent {
  render() {
    const {
      issueData,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
      organizationData,
    } = this.props;
    return (
      <Fragment>
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
        <ManualForm
          issueData={issueData}
          handleInputChange={handleInputChange}
        />
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
      </Fragment>
    );
  }
}

ManualIssue.propTypes = {
  issueData: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  issueData: makeSelectIssues('issueData'),
  organizationData: makeSelectIssues('organizationData'),
  isDisabled: makeSelectIssuesDisabled(),
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
