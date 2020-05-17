import React, { Fragment } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideNav from 'components/SideNav';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectActiveUser } from 'containers/Auth/selectors';
import { signin, signout } from 'containers/Auth/actions';

import routes from './routes';
import { AppBody } from './styledComponents';

export const Main = ({
  activeUser,
  data = { test: true },
  deviceView,
  error,
  handleNav,
  handleSignin,
  handleSignout,
  isSignedIn,
  loading,
  match,
}) => (
  <Fragment>
    <Header
      activeUser={activeUser}
      handleNav={handleNav}
      handleSignin={handleSignin}
      handleSignout={handleSignout}
      isSignedIn={isSignedIn}
      view={deviceView}
    />
    <AppBody>
      <SideNav handleNav={handleNav} view={deviceView} />
      <AsyncRender
        asyncData={data}
        component={routes}
        error={error}
        loading={loading}
        match={match}
      />
    </AppBody>
    <Footer />
  </Fragment>
);

Main.propTypes = {
  activeUser: T.object,
  data: T.object,
  deviceView: T.string,
  error: T.object,
  handleNav: T.func,
  handleSignin: T.func,
  handleSignout: T.func,
  isSignedIn: T.bool,
  loading: T.bool,
  match: T.object,
};

const mapStateToProps = createStructuredSelector({
  activeUser: makeSelectActiveUser('activeUser'),
  isSignedIn: makeSelectActiveUser('isSignedIn'),
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const mapDispatchToProps = dispatch => ({
  /**
   * Auth
   */
  handleSignin: payload => dispatch(signin(payload)),
  handleSignout: payload => dispatch(signout(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(Main));
