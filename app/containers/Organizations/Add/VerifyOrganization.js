import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryAsyncButton } from 'components/base_ui';
import VerifyForm from 'components/Organizations/Add/VerifyForm';

import { clearForm, incrementStep, saveInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsRequestBody,
} from '../selectors';
import {
  BackLink,
  ButtonGroup,
  StyledCheckboxWithLabel,
  StyledFocusDiv,
  StyledH3,
  Wrapper,
} from './styledComponents';

const VerifyOrganization = ({
  activeUser,
  dispatchClearForm,
  dispatchIncrementStep,
  dispatchSaveInfo,
  dispatchVerifyInfo,
  importSuccess,
  isVerified,
  organizationData,
  requestBody,
}) => {
  useEffect(() => document.getElementById('organizationAdd').focus(), []);

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && isVerified) {
      handleSaveInfo();
    }
  };
  const handleSaveInfo = () => {
    dispatchSaveInfo({ activeUser, requestBody });
  };
  const cancelImport = () => {
    dispatchClearForm();
    dispatchIncrementStep({ step: 1, view: 'addOrganization' });
  };
  return (
    <StyledFocusDiv
      id="organizationAdd"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Verify Organization Information</StyledH3>
      <Wrapper>
        <VerifyForm organizationData={organizationData} />
        <StyledCheckboxWithLabel
          checked={isVerified}
          label={verifyMessage}
          onChange={dispatchVerifyInfo}
        />
      </Wrapper>
      <ButtonGroup>
        {importSuccess ? (
          <BackLink onClick={() => cancelImport()}>Cancel</BackLink>
        ) : (
          <BackLink
            onClick={() =>
              dispatchIncrementStep({ step: 2, view: 'addOrganization' })
            }
          >
            Edit Org
          </BackLink>
        )}
        <PrimaryAsyncButton
          disabled={!isVerified}
          label="Submit"
          onClick={handleSaveInfo}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

VerifyOrganization.propTypes = {
  activeUser: T.object,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  dispatchVerifyInfo: T.func,
  importSuccess: T.bool,
  isVerified: T.bool,
  organizationData: T.object,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  isVerified: makeSelectOrganizations('isVerified'),
  organizationData: makeSelectOrganizations('organizationData'),
  requestBody: makeSelectOrganizationsRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchSaveInfo: payload => dispatch(saveInfo(payload)),
    dispatchVerifyInfo: () => dispatch(verifyInfo()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyOrganization);
