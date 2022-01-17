import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import RedirectComponent from 'components/Signin/Redirect';
import { signOut } from 'containers/Auth/actions';
import {
  makeSelectAuth,
  makeSelectAuthLoading,
  makeSelectAuthRoute,
} from 'containers/Auth/selectors';

const RedirectContainer = ({
  activeUser,
  dispatchSignOut,
  handleNav,
  isSignInRoute,
  isSignUpRoute,
  loading,
}) => {
  const isCompany = !!activeUser.company;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isSignInRoute || isSignUpRoute) {
    const path = isCompany ? '/company/dashboard' : '/dashboard';
    return <Redirect to={path} />;
  }
  return (
    <AsyncRender
      asyncData={activeUser}
      component={RedirectComponent}
      isRequiredData
      loading={loading}
      propsToPassDown={{
        dispatchSignOut,
        handleNav,
      }}
    />
  );
};

RedirectContainer.propTypes = {
  activeUser: T.object.isRequired,
  dispatchSignOut: T.func.isRequired,
  handleNav: T.func.isRequired,
  isSignInRoute: T.bool.isRequired,
  isSignUpRoute: T.bool.isRequired,
  loading: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignInRoute: makeSelectAuthRoute('signIn'),
  isSignUpRoute: makeSelectAuthRoute('signUp'),
  loading: makeSelectAuthLoading('auth'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchSignOut: () => dispatch(signOut()),
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RedirectContainer);
