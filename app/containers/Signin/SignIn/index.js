import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import Signin from 'components/Signin';
import { signIn } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange } from '../actions';
import reducer from '../reducer';
import { makeSelectSignIn } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class SigninContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign in';
  }

  render() {
    const { data, isSignedIn, dispatchSignIn, handleInputChange } = this.props;
    console.log(data);
    const { email, password } = data;

    const handleSignIn = () => {
      dispatchSignIn({
        username: email.value,
        password: password.value,
      });
    };

    const signinComponent = (
      <Signin
        data={data}
        handleInputChange={handleInputChange}
        handleSignIn={handleSignIn}
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

SigninContainer.propTypes = {
  data: T.object,
  dispatchSignIn: T.func,
  handleInputChange: T.func,
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
    dispatchSignIn: payload => dispatch(signIn(payload)),
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

const withReducer = injectReducer({ key: 'signin', reducer });

export default compose(
  withReducer,
  withConnect,
)(SigninContainer);
