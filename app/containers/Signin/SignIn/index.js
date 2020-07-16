import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import Signin from 'components/Signin/Signin';
import { signIn } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { clearForm, inputChange } from '../actions';
import reducer from '../reducer';
import { makeSelectSignIn } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class SigninContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign in';
  }

  componentWillUnmount() {
    const { dispatchClearForm } = this.props;
    dispatchClearForm();
  }

  render() {
    const { data, dispatchSignIn, handleInputChange, isSignedIn } = this.props;

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
            handleInputChange,
            handleSignIn,
            isSignedIn,
          }}
        />
      </Fragment>
    );
  }
}

SigninContainer.propTypes = {
  data: T.object,
  dispatchClearForm: T.func,
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
  data: makeSelectSignIn('signIn'),
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
