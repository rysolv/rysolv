import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Organizations/Add/ManualForm';

import { incrementStep, inputChange, updateIsManual } from '../actions';
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

const ManualOrganization = ({
  dispatchUpdateIsManual,
  handleIncrementStep,
  handleInputChange,
  isDisabled,
  organizationData,
}) => {
  useEffect(() => {
    dispatchUpdateIsManual({ value: true });
    document.getElementById('organizationManual').focus();
  }, []);

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && isDisabled) {
      handleIncrementStep({ step: 3, view: 'addOrganization' });
    }
  };
  return (
    <StyledFocusDiv
      id="organizationManual"
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
  dispatchUpdateIsManual: T.func,
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
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualOrganization);
