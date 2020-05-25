import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyForm from 'components/Issues/Add/Verify';

import { incrementStep, saveInfo, verifyInfo, clearForm } from '../actions';
import { makeSelectIssues, makeSelectIssuesRequestBody } from '../selectors';
import {
  ButtonGroup,
  LogoContainer,
  OrganizationNameWrapper,
  SelectedOrganization,
  StyledH3,
  StyledLink,
  VerifyWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyIssue extends React.PureComponent {
  render() {
    const {
      activeUser,
      dispatchClearForm,
      importSuccess,
      issueData,
      dispatchIncrementStep,
      dispatchSaveInfo,
      handleNav,
      organizationData,
      requestBody,
    } = this.props;
    const handleSaveInfo = () => {
      dispatchSaveInfo({ requestBody, activeUser });
      handleNav('/issues');
    };
    const cancelImport = () => {
      dispatchClearForm();
      dispatchIncrementStep({ step: 1, view: 'addIssue' });
    };
    return (
      <Fragment>
        <StyledH3>Organization</StyledH3>
        <VerifyWrapper>
          <LogoContainer
            src={organizationData.organizationLogo.value}
            alt={organizationData.organizationName.value}
          />
          <OrganizationNameWrapper>
            <SelectedOrganization>
              {organizationData.organizationName.value}
            </SelectedOrganization>
            <StyledLink
              href={organizationData.organizationRepo.value}
              target="_blank"
            >
              {organizationData.organizationRepo.value}
            </StyledLink>
          </OrganizationNameWrapper>
        </VerifyWrapper>
        <StyledH3>Issue</StyledH3>
        <VerifyWrapper>
          <VerifyForm activeUser={activeUser} issueData={issueData} />
        </VerifyWrapper>
        <ButtonGroup>
          {importSuccess ? (
            <SecondaryButton label="Cancel" onClick={() => cancelImport()} />
          ) : (
            <SecondaryButton
              label="Edit Issue"
              onClick={() =>
                dispatchIncrementStep({ step: 3, view: 'addIssue' })
              }
            />
          )}

          <PrimaryAsyncButton
            disabled={!importSuccess}
            label="Submit"
            onClick={handleSaveInfo}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

VerifyIssue.propTypes = {
  activeUser: T.object,
  dispatchClearForm: T.func,
  importSuccess: T.bool,
  issueData: T.object,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  handleNav: T.func,
  organizationData: T.object,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  issueData: makeSelectIssues('issueData'),
  organizationData: makeSelectIssues('organizationData'),
  requestBody: makeSelectIssuesRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchSaveInfo: payload => dispatch(saveInfo(payload)),
    dispatchVerifyInfo: () => dispatch(verifyInfo()),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyIssue);
