import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyExistingForm from 'components/Users/Edit/VerifyExistingForm';

import { clearForm, incrementStep, updateInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import { makeSelectUsers } from '../selectors';
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
      editInfo,
      dispatchIncrementStep,
      dispatchUpdateInfo,
      dispatchVerifyInfo,
      handleNav,
      isVerified,
    } = this.props;
    const handleUpdateInfo = () => {
      const { id } = editInfo;
      dispatchUpdateInfo({ userId: id.value, editInfo });
      handleNav('/admin/users');
    };
    return (
      <Fragment>
        <StyledH3>Verify User Information</StyledH3>
        <Wrapper>
          <VerifyExistingForm editInfo={editInfo} />
          <StyledCheckboxWithLabel
            checked={isVerified}
            label={verifyMessage}
            onChange={dispatchVerifyInfo}
          />
        </Wrapper>
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => dispatchIncrementStep({ step: 1, view: 'editUser' })}
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
  editInfo: T.object,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchUpdateInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
  isVerified: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  editInfo: makeSelectUsers('editInfo'),
  isVerified: makeSelectUsers('isVerified'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchUpdateInfo: payload => dispatch(updateInfo(payload)),
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
)(VerifyExisting);
