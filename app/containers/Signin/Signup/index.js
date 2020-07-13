import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import Signup from 'components/Signin/Signup';
import { signUp } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange } from '../actions';
import { makeSelectSignIn } from '../selectors';
import reducer from '../reducer';

// eslint-disable-next-line react/prefer-stateless-function
export class SignupContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign in';
  }

  render() {
    const { data, handleInputChange, dispatchSignUp, isSignedIn } = this.props;

    const { email, password } = data;

    const handleSignUp = () => {
      dispatchSignUp({
        username: email.value,
        password: password.value,
      });
    };

    const signinComponent = (
      <Signup
        data={data}
        handleInputChange={handleInputChange}
        handleSignUp={handleSignUp}
        isSignedIn={isSignedIn}
      />
    );
    const redirect = <Redirect to="/issues" />;

    return (
      <Fragment>
        <ConditionalRender
          Component={signinComponent}
          FallbackComponent={redirect}
          shouldRender={!isSignedIn}
        />
      </Fragment>
    );
  }
}

SignupContainer.propTypes = {
  data: T.object,
  handleInputChange: T.func,
  dispatchSignUp: T.func,
  isSignedIn: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  isSignedIn: makeSelectAuth('isSignedIn'),
  /*
   * Reducer : Signin
   */
  data: makeSelectSignIn('data'),
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
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signn', reducer });

export default compose(
  withReducer,
  withConnect,
)(SignupContainer);
