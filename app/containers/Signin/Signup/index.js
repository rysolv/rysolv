import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import Signup from 'components/Signin/Signup';
import { signin } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange } from '../actions';
import { makeSelectSignin } from '../selectors';
import reducer from '../reducer';

// eslint-disable-next-line react/prefer-stateless-function
export class SignupContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign Up';
  }

  render() {
    const { data, handleInputChange, handleSignin, isSignedIn } = this.props;
    const signinComponent = (
      <Signup
        data={data}
        handleInputChange={handleInputChange}
        handleSignin={handleSignin}
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
  handleSignin: T.func,
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
  data: makeSelectSignin('data'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    handleSignin: payload => dispatch(signin(payload)),
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
)(SignupContainer);
