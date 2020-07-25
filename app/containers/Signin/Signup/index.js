import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import {
  clearAlerts,
  clearState,
  signUp,
  verifyEmail,
} from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthError,
  makeSelectAuthLoading,
} from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { clearForm, incrementStep, inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';
import reducer from '../reducer';
import { signUpDictionary } from '../stepDictionary';

// eslint-disable-next-line react/prefer-stateless-function
export class SignUpContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Create Account';
  }

  componentWillUnmount() {
    const { dispatchClearAuthState, dispatchClearForm } = this.props;
    dispatchClearAuthState({ state: 'verificationSent' });
    dispatchClearForm();
  }

  render() {
    const {
      activeUser,
      data,
      dispatchIncrementStep,
      dispatchInputError,
      dispatchSignUp,
      dispatchVerifyEmail,
      error,
      handleClearAuthAlerts,
      handleInputChange,
      isSignedIn,
      signUpDisabled,
      signUpLoading,
      step,
      verificationSent,
      verify,
      verifyDisabled,
      verifyEmailLoading,
    } = this.props;

    if (verificationSent) {
      dispatchIncrementStep({ step: 2 });
    }

    const StepToRender = signUpDictionary[step];
    const { email: userEmail, id: userId } = activeUser;
    const { email, firstName, lastName, password, username } = data;
    const { verificationCode } = verify;

    const handleSignUp = () => {
      const { isValidated, validationErrors } = validateFields({
        values: data,
        verifyField: { verifyValue: password.value, field: 'password' },
      });
      if (isValidated) {
        dispatchSignUp({
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          password: password.value,
          username: username.value,
        });
      } else {
        dispatchInputError({ errors: validationErrors, form: 'signUp' });
      }
    };

    const handleVerifyEmail = () => {
      dispatchVerifyEmail({
        password: password.value,
        userEmail,
        userId,
        verificationCode,
      });
    };

    const handleValidateInput = ({ field, verifyField }) => {
      const validationError =
        validateOneField({ field, values: data, verifyField }) || '';
      dispatchInputError({
        errors: {
          [field]: validationError,
        },
        form: 'signUp',
      });
    };

    const RedirectComponent = () => <Redirect to="/issues" />;

    return (
      <Fragment>
        <ConditionalRender
          Component={StepToRender}
          FallbackComponent={RedirectComponent}
          propsToPassDown={{
            activeUser,
            data,
            error,
            handleClearAuthAlerts,
            handleInputChange,
            handleSignUp,
            handleValidateInput,
            handleVerifyEmail,
            isSignedIn,
            signUpDisabled,
            signUpLoading,
            verify,
            verifyDisabled,
            verifyEmailLoading,
          }}
          shouldRender={!isSignedIn}
        />
      </Fragment>
    );
  }
}

SignUpContainer.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchClearAuthState: T.func,
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchInputError: T.func,
  dispatchSignUp: T.func,
  dispatchVerifyEmail: T.func,
  error: T.object,
  handleClearAuthAlerts: T.func,
  handleInputChange: T.func,
  isSignedIn: T.bool,
  signUpDisabled: T.bool,
  signUpLoading: T.bool,
  step: T.number,
  verificationSent: T.bool,
  verify: T.object,
  verifyDisabled: T.bool,
  verifyEmailLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  error: makeSelectAuthError('signUp'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  signUpLoading: makeSelectAuthLoading('signUp'),
  verificationSent: makeSelectAuth('verificationSent'),
  verifyEmailLoading: makeSelectAuthLoading('verifyEmail'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('signUp'),
  signUpDisabled: makeSelectDisabled('signUp'),
  step: makeSelectSignIn('step'),
  verify: makeSelectSignIn('verify'),
  verifyDisabled: makeSelectDisabled('verify'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchClearAuthState: payload => dispatch(clearState(payload)),
    dispatchSignUp: payload => dispatch(signUp(payload)),
    handleClearAuthAlerts: () => dispatch(clearAlerts()),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
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
