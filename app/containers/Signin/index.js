import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ConditionalRender } from 'components/base_ui';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import { usePrevious } from 'utils/globalHelpers';

import { resetState } from './actions';
import PasswordResetComponent from './PasswordReset';
import RedirectComponent from './Redirect';
import reducer from './reducer';
import SignInComponent from './SignIn';
import SignUpComponent from './SignUp';
import { ViewContainer } from './styledComponents';

const Signin = ({ dispatchResetState, isSignedIn, match }) => {
  const view = match.path.substr(1);

  const previousView = usePrevious(view);
  useEffect(() => {
    if (!!previousView && previousView !== view) {
      dispatchResetState();
    }
  }, [previousView, view]);

  const dictionaryToUse = {
    'password-reset': PasswordResetComponent,
    signin: SignInComponent,
    signup: SignUpComponent,
  };

  const ComponentToRender = dictionaryToUse[view];

  return (
    <ViewContainer>
      <ConditionalRender
        Component={() => <ComponentToRender />}
        FallbackComponent={() => <RedirectComponent />}
        shouldRender={!isSignedIn}
      />
    </ViewContainer>
  );
};

Signin.propTypes = {
  dispatchResetState: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  match: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  isSignedIn: makeSelectAuth('isSignedIn'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchResetState: () => dispatch(resetState()),
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
)(Signin);
