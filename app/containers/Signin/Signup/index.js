import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import { signUp, verifyEmail } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange, incrementStep, clearForm } from '../actions';
import {
  makeSelectSignIn,
  makeSelectSignUpDisabled,
  makeSelectVerifyDisabled,
} from '../selectors';
import reducer from '../reducer';
import { signUpDictionary } from '../stepDictionary';

// eslint-disable-next-line react/prefer-stateless-function
export class SignUpContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Create Account';
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const {
      activeUser,
      data,
      dispatchIncrementStep,
      dispatchSignUp,
      error,
      handleInputChange,
      isSignedIn,
      signUpDisabled,
      step,
      verificationSent,
      verify,
      verifyDisabled,
      dispatchVerifyEmail,
    } = this.props;

    if (verificationSent) {
      dispatchIncrementStep({ step: 2 });
    }

    const StepToRender = signUpDictionary[step];
    const { email: userEmail, id: userId } = activeUser;
    const { email, firstName, lastName, password, username } = data;
    const { verificationCode } = verify;

    const handleSignUp = () => {
      dispatchSignUp({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        username: username.value,
      });
    };

    const handleVerifyEmail = () => {
      dispatchVerifyEmail({
        password: password.value,
        userEmail,
        userId,
        verificationCode,
      });
    };

    const redirect = <Redirect to="/issues" />;

    return (
      <Fragment>
        <ConditionalRender
          Component={StepToRender}
          FallbackComponent={redirect}
          shouldRender={!isSignedIn}
          propsToPassDown={{
            activeUser,
            data,
            error: error.signUp,
            handleInputChange,
            handleSignUp,
            handleVerifyEmail,
            isSignedIn,
            signUpDisabled,
            verify,
            verifyDisabled,
          }}
        />
      </Fragment>
    );
  }
}

SignUpContainer.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSignUp: T.func,
  dispatchVerifyEmail: T.func,
  error: T.object,
  handleInputChange: T.func,
  isSignedIn: T.bool,
  signUpDisabled: T.bool,
  step: T.number,
  verificationSent: T.bool,
  verify: T.object,
  verifyDisabled: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  error: makeSelectAuth('error'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  verificationSent: makeSelectAuth('verificationSent'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('signUp'),
  signUpDisabled: makeSelectSignUpDisabled(),
  step: makeSelectSignIn('step'),
  verify: makeSelectSignIn('verify'),
  verifyDisabled: makeSelectVerifyDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSignUp: payload => dispatch(signUp(payload)),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchVerifyEmail: payload => dispatch(verifyEmail(payload)),
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
)(SignUpContainer);
