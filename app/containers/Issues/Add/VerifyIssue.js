import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyForm from 'components/Issues/Add/VerifyForm';

import { clearForm, incrementStep, saveInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import { makeSelectIssues, makeSelectIssuesRequestBody } from '../selectors';
import {
  ButtonGroup,
  StyledCheckboxWithLabel,
  StyledH3,
  Wrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyIssue extends React.PureComponent {
  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const {
      data,
      dispatchIncrementStep,
      dispatchSaveInfo,
      dispatchVerifyInfo,
      handleNav,
      isVerified,
      requestBody,
    } = this.props;
    const handleSaveInfo = () => {
      dispatchSaveInfo({ requestBody });
      handleNav('/admin/issues');
    };
    return (
      <Fragment>
        <StyledH3>Verify Company Information</StyledH3>
        <Wrapper>
          <VerifyForm data={data} />
          <StyledCheckboxWithLabel
            checked={isVerified}
            label={verifyMessage}
            onChange={dispatchVerifyInfo}
          />
        </Wrapper>
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => dispatchIncrementStep({ step: 2, view: 'addIssue' })}
          />
          <PrimaryAsyncButton
            disabled={!isVerified}
            label="Save"
            onClick={handleSaveInfo}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

VerifyIssue.propTypes = {
  data: T.object,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
  isVerified: T.bool,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectIssues('data'),
  isVerified: makeSelectIssues('isVerified'),
  requestBody: makeSelectIssuesRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
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
