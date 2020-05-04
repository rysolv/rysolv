import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import ManualForm from 'components/Users/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import { makeSelectUsers, makeSelectUsersDisabled } from '../selectors';
import { ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualUser extends React.PureComponent {
  render() {
    const {
      data,
      handleIncrementStep,
      handleInputChange,
      handleNav,
      isDisabled,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Add User</StyledH3>
        <ManualForm data={data} handleInputChange={handleInputChange} />
        <ButtonGroup>
          <SecondaryButton label="Back" onClick={() => handleNav('/users')} />
          <PrimaryButton
            disabled={!isDisabled}
            label="Next"
            onClick={() => handleIncrementStep({ step: 2, view: 'addUser' })}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

ManualUser.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  isDisabled: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  data: makeSelectUsers('data'),
  isDisabled: makeSelectUsersDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /**
     * Reducer : Users
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualUser);
