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
import { editUserDictionary } from '../stepDictionary';
import { EditWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class EditUser extends React.PureComponent {
  componentDidMount() {
    const { handleIncrementStep } = this.props;
    handleIncrementStep({ step: 1, view: 'editUser' });
  }

  render() {
    const { data, loading, step } = this.props;

    const StepToRender = editUserDictionary[step];
    return (
      <EditWrapper>
        <AsyncRender
          asyncData={{ data }}
          component={StepToRender}
          loading={loading}
        />
      </EditWrapper>
    );
  }
}

EditUser.propTypes = {
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
  loading: makeSelectUsersLoading('editUser'),
  step: makeSelectUsersStep('editUser'),
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
)(EditUser);
