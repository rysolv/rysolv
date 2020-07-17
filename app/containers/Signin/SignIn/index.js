import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import Signin from 'components/Signin/Signin';
import { clearAlerts, signIn } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthError,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { clearForm, inputChange } from '../actions';
import reducer from '../reducer';
import { makeSelectSignIn, makeSelectSignInDisabled } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class SigninContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign In';
  }

  componentWillUnmount() {
    const { dispatchClearAuthAlerts, dispatchClearForm } = this.props;
    dispatchClearForm();
    dispatchClearAuthAlerts();
  }

  render() {
    const {
      data,
      dispatchSignIn,
      error,
      handleInputChange,
      isSignedIn,
      signInDisabled,
      signInLoading,
    } = this.props;

    const { email, password } = data;

    const handleSignIn = () => {
      dispatchSignIn({
        username: email.value,
        password: password.value,
      });
    };

    const redirect = <Redirect to="/issues" />;

    return (
      <Fragment>
        <ConditionalRender
          Component={Signin}
          FallbackComponent={redirect}
          shouldRender={!isSignedIn}
          propsToPassDown={{
            data,
            error,
            handleInputChange,
            handleSignIn,
            isSignedIn,
            signInDisabled,
            signInLoading,
          }}
        />
      </Fragment>
    );
  }
}

SigninContainer.propTypes = {
  data: T.object,
  dispatchClearAuthAlerts: T.func,
  dispatchClearForm: T.func,
  dispatchSignIn: T.func,
  error: T.object,
  handleInputChange: T.func,
  isSignedIn: T.bool,
  signInDisabled: T.bool,
  signInLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  error: makeSelectAuthError('signIn'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  signInLoading: makeSelectAuthLoading('signIn'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('signIn'),
  signInDisabled: makeSelectSignInDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSignIn: payload => dispatch(signIn(payload)),
    dispatchClearAuthAlerts: () => dispatch(clearAlerts()),

    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signin', reducer });

export default compose(
  withReducer,
  withConnect,
)(SigninContainer);
