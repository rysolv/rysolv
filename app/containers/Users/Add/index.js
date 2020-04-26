import React, { Fragment } from 'react';
import T from 'prop-types';
import { BackNav } from 'components/base_ui';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';

import { incrementStep, clearForm } from '../actions';
import {
  makeSelectUsers,
  makeSelectUsersLoading,
  makeSelectUsersStep,
} from '../selectors';
import { addUserDictionary } from '../stepDictionary';
import { AddWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class AddUser extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addUser' });
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const { data, loading, step, handleNav } = this.props;

    const StepToRender = addUserDictionary[step];
    return (
      <Fragment>
        <BackNav
          label="Back to Users"
          handleNav={handleNav}
          path="/admin/users"
        />
        <AddWrapper>
          <AsyncRender
            asyncData={{ data }}
            component={StepToRender}
            loading={loading}
          />
        </AddWrapper>
      </Fragment>
    );
  }
}

AddUser.propTypes = {
  data: T.object,
  dispatchClearForm: T.func,
  handleIncrementStep: T.func,
  handleNav: T.func,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  data: makeSelectUsers('data'),
  loading: makeSelectUsersLoading('addUser'),
  step: makeSelectUsersStep('addUser'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchClearForm: () => dispatch(clearForm()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
