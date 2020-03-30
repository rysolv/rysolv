import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyForm from 'components/Users/Add/VerifyForm';

import { clearForm, incrementStep, saveInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import { makeSelectUsers, makeSelectUsersCreateRequest } from '../selectors';
import {
  ButtonGroup,
  StyledCheckboxWithLabel,
  StyledH3,
  Wrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyUser extends React.PureComponent {
  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const {
      createRequest,
      data,
      dispatchIncrementStep,
      dispatchSaveInfo,
      dispatchVerifyInfo,
      handleNav,
      isVerified,
    } = this.props;
    const handleSaveInfo = () => {
      dispatchSaveInfo({ createRequest });
      handleNav('/admin/users');
    };
    return (
      <Fragment>
        <StyledH3>Verify User Information</StyledH3>
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
            onClick={() => dispatchIncrementStep({ step: 1, view: 'addUser' })}
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

VerifyUser.propTypes = {
  createRequest: T.object,
  data: T.object,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
  isVerified: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  createRequest: makeSelectUsersCreateRequest(),
  data: makeSelectUsers('data'),
  isVerified: makeSelectUsers('isVerified'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
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
)(VerifyUser);
