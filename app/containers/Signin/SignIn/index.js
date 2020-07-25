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

import { clearForm, inputChange, inputError } from '../actions';
import { validateFields, validateOneField } from '../helpers';
import reducer from '../reducer';
import { makeSelectDisabled, makeSelectSignIn } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class SigninContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign In';
  }

  componentWillUnmount() {
    const { dispatchClearForm, handleClearAuthAlerts } = this.props;
    dispatchClearForm();
    handleClearAuthAlerts();
  }

  render() {
    const {
      data,
      dispatchInputError,
      dispatchSignIn,
      error,
      handleClearAuthAlerts,
      handleInputChange,
      isSignedIn,
      signInDisabled,
      signInLoading,
    } = this.props;

    const { email, password } = data;

    const handleSignIn = () => {
      const { isValidated, validationErrors } = validateFields({
        values: data,
      });
      if (isValidated) {
        dispatchSignIn({
          password: password.value,
          username: email.value,
        });
      } else {
        dispatchInputError({ errors: validationErrors, form: 'signIn' });
      }
    };

    const handleValidateInput = ({ field }) => {
      const validationError = validateOneField({ field, values: data }) || '';
      dispatchInputError({
        errors: {
          [field]: validationError,
        },
        form: 'signIn',
      });
    };

    const RedirectComponent = () => <Redirect to="/issues" />;

    return (
      <Fragment>
        <ConditionalRender
          Component={Signin}
          FallbackComponent={RedirectComponent}
          propsToPassDown={{
            data,
            error,
            handleClearAuthAlerts,
            handleInputChange,
            handleSignIn,
            handleValidateInput,
            isSignedIn,
            signInDisabled,
            signInLoading,
          }}
          shouldRender={!isSignedIn}
        />
      </Fragment>
    );
  }
}

SigninContainer.propTypes = {
  data: T.object,
  dispatchClearForm: T.func,
  dispatchInputError: T.func,
  dispatchSignIn: T.func,
  error: T.object,
  handleClearAuthAlerts: T.func,
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
  signInDisabled: makeSelectDisabled('signIn'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSignIn: payload => dispatch(signIn(payload)),
    handleClearAuthAlerts: () => dispatch(clearAlerts()),

    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
    /*
     * Reducer : Signin
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchInputError: payload => dispatch(inputError(payload)),
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
