import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { incrementStep } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectUsers,
  makeSelectUsersLoading,
  makeSelectUsersStep,
} from '../selectors';
import { editUserDictionary } from '../stepDictionary';
import { EditWrapper } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class UsersEdit extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Edit User';
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

UsersEdit.propTypes = {
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
  loading: makeSelectUsersLoading('fetchUser'),
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UsersEdit);
