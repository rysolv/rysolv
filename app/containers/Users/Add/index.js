import React from 'react';
import T from 'prop-types';
import { BackNav } from 'components/base_ui';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { incrementStep, clearForm } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectUsers,
  makeSelectUsersLoading,
  makeSelectUsersStep,
} from '../selectors';
import { addUserDictionary } from '../stepDictionary';
import { AddWrapper, AddForm } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class UsersAdd extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign Up';
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
      <AddWrapper>
        <BackNav label="Back to Users" handleNav={handleNav} path="/users" />
        <AddForm>
          <AsyncRender
            asyncData={{ data }}
            component={StepToRender}
            loading={loading}
          />
        </AddForm>
      </AddWrapper>
    );
  }
}

UsersAdd.propTypes = {
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
)(UsersAdd);
