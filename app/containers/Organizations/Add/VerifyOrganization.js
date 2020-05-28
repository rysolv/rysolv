import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyForm from 'components/Organizations/Add/VerifyForm';

import { clearForm, incrementStep, saveInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsRequestBody,
} from '../selectors';
import {
  ButtonGroup,
  StyledCheckboxWithLabel,
  StyledH3,
  Wrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyOrganization extends React.PureComponent {
  render() {
    const {
      dispatchClearForm,
      dispatchIncrementStep,
      dispatchSaveInfo,
      dispatchVerifyInfo,
      handleNav,
      importSuccess,
      isVerified,
      organizationData,
      requestBody,
    } = this.props;
    const handleSaveInfo = () => {
      dispatchSaveInfo({ requestBody });
      handleNav('/organizations');
    };
    const cancelImport = () => {
      dispatchClearForm();
      dispatchIncrementStep({ step: 1, view: 'addOrganization' });
    };
    return (
      <Fragment>
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
            <SecondaryButton label="Cancel" onClick={() => cancelImport()} />
          ) : (
            <SecondaryButton
              label="Edit"
              onClick={() =>
                dispatchIncrementStep({ step: 2, view: 'addOrganization' })
              }
            />
          )}
          <PrimaryAsyncButton
            disabled={!isVerified}
            label="Submit"
            onClick={handleSaveInfo}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

VerifyOrganization.propTypes = {
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
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
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyOrganization);
