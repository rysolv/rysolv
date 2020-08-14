import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Organizations/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsDisabled,
} from '../selectors';
import {
  BackLink,
  ButtonGroup,
  StyledFocusDiv,
  StyledH3,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
const ManualOrganization = ({
  handleIncrementStep,
  handleInputChange,
  isDisabled,
  organizationData,
}) => {
  useEffect(() => document.getElementById('organization-manual').focus(), []);

  const handleKeypress = ({ keyCode, which }) => {
    if ((keyCode === 13 || which === 13 || 0) && isDisabled) {
      handleIncrementStep({ step: 3, view: 'addOrganization' });
    }
  };
  return (
    <StyledFocusDiv
      id="organization-manual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Add Organization</StyledH3>
      <ManualForm
        handleInputChange={handleInputChange}
        organizationData={organizationData}
      />
      <ButtonGroup>
        <BackLink
          onClick={() =>
            handleIncrementStep({ step: 1, view: 'addOrganization' })
          }
        >
          Back
        </BackLink>
        <PrimaryButton
          disabled={!isDisabled}
          label="Next"
          onClick={() =>
            handleIncrementStep({ step: 3, view: 'addOrganization' })
          }
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ManualOrganization.propTypes = {
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  isDisabled: makeSelectOrganizationsDisabled(),
  organizationData: makeSelectOrganizations('organizationData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualOrganization);
