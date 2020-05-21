import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import { ConditionalRender } from 'components/base_ui';

import { push } from 'connected-react-router';
import { signin } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import Signup from 'components/Signin/Signup';
import { makeSelectSignin } from '../selectors';
import { inputChange } from '../actions';
import reducer from '../reducer';

// eslint-disable-next-line react/prefer-stateless-function
export class SignupContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign in';
  }

  render() {
    const { data, isSignedIn, handleSignin, handleInputChange } = this.props;
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
  data: makeSelectSignin('data'),
  isSignedIn: makeSelectAuth('isSignedIn'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Router
     */
    handleSignin: payload => dispatch(signin(payload)),
    handleNav: route => dispatch(push(route)),
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
