import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryAsyncButton } from 'components/base_ui';
import VerifyForm from 'components/Organizations/Add/VerifyForm';

import {
  clearForm,
  generateIdenticon,
  incrementStep,
  saveInfo,
} from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsRequestBody,
} from '../selectors';
import {
  BackLink,
  ButtonGroup,
  StyledFocusDiv,
  StyledH3,
  Wrapper,
} from './styledComponents';

const VerifyOrganization = ({
  dispatchClearForm,
  dispatchIncrementStep,
  dispatchSaveInfo,
  handleGenerateIdenticon,
  importSuccess,
  organizationData,
  organizationData: { organizationLogo },
  requestBody,
}) => {
  useEffect(() => {
    if (!organizationLogo.value) handleGenerateIdenticon();
    document.getElementById('organizationAdd').focus();
  }, []);

  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleSaveInfo();
    }
  };
  const handleSaveInfo = () => {
    dispatchSaveInfo({ requestBody });
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
        <PrimaryAsyncButton label="Submit" onClick={handleSaveInfo} />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

VerifyOrganization.propTypes = {
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  handleGenerateIdenticon: T.func,
  importSuccess: T.bool,
  organizationData: T.object,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
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
    handleGenerateIdenticon: () => dispatch(generateIdenticon()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyOrganization);
