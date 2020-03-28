import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyExistingForm from 'components/Companies/Edit/VerifyExistingForm';

import { clearForm, incrementStep, updateInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import { makeSelectCompanies } from '../selectors';
import {
  ButtonGroup,
  StyledCheckboxWithLabel,
  StyledH3,
  Wrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyExisting extends React.PureComponent {
  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const {
      companyInfo,
      dispatchIncrementStep,
      dispatchUpdateInfo,
      dispatchVerifyInfo,
      handleNav,
      isVerified,
    } = this.props;
    const handleUpdateInfo = () => {
      const { id } = companyInfo;
      dispatchUpdateInfo({ companyId: id.value, companyInfo });
      handleNav({ subroute: 'companies' });
    };
    return (
      <Fragment>
        <StyledH3>Verify Company Information</StyledH3>
        <Wrapper>
          <VerifyExistingForm companyInfo={companyInfo} />
          <StyledCheckboxWithLabel
            checked={isVerified}
            label={verifyMessage}
            onChange={dispatchVerifyInfo}
          />
        </Wrapper>
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() =>
              dispatchIncrementStep({ step: 1, view: 'editCompany' })
            }
          />
          <PrimaryAsyncButton
            disabled={!isVerified}
            label="Save"
            onClick={handleUpdateInfo}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

VerifyExisting.propTypes = {
  companyInfo: T.object,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchUpdateInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
  isVerified: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  companyInfo: makeSelectCompanies('companyInfo'),
  isVerified: makeSelectCompanies('isVerified'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchUpdateInfo: payload => dispatch(updateInfo(payload)),
    dispatchVerifyInfo: () => dispatch(verifyInfo()),
    /**
     * Reducer : Router
     */
    handleNav: ({ subroute }) => {
      dispatch(push(`/admin/${subroute}`));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyExisting);
