import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';

import { incrementStep } from '../actions';
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
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'addUser' });
  }

  render() {
    const { data, loading, step } = this.props;

    const StepToRender = addUserDictionary[step];
    return (
      <AddWrapper>
        <AsyncRender
          asyncData={{ data }}
          component={StepToRender}
          loading={loading}
        />
      </AddWrapper>
    );
  }
}

AddUser.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
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
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
