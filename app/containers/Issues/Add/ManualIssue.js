import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import ManualForm from 'components/Issues/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import { makeSelectIssues, makeSelectIssuesDisabled } from '../selectors';
import {
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
      data,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
      organization,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Organization</StyledH3>
        <VerifyWrapper>
          <SelectedOrganization>
            {organization.organizationName.value}
          </SelectedOrganization>
          <StyledLink
            href={`//${organization.organizationRepo.value}`}
            target="_blank"
          >
            {organization.organizationRepo.value}
          </StyledLink>
        </VerifyWrapper>
        <StyledH3>Add Issue</StyledH3>
        <ManualForm data={data} handleInputChange={handleInputChange} />
        <ButtonGroup>
          <SecondaryButton
            label="Edit Org"
            onClick={() => handleIncrementStep({ step: 2, view: 'addIssue' })}
          />
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
  data: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  organization: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  data: makeSelectIssues('data'),
  organization: makeSelectIssues('organizationData'),
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
