import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { ConditionalRender } from 'components/base_ui';
import Signin from 'components/Signin';
import { signin } from 'containers/Auth/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';

import { inputChange } from './actions';
import reducer from './reducer';
import { makeSelectSignin } from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class SigninContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Sign in';
  }

  render() {
    const { data, isSignedIn, handleSignin, handleInputChange } = this.props;
    const signinComponent = (
      <Signin
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

SigninContainer.propTypes = {
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
)(SigninContainer);
