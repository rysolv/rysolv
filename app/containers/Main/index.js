import React, { Fragment } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import Header from 'components/Header';
import Footer from 'components/Footer';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectActiveUser } from 'containers/Auth/selectors';
import { login, logout } from 'containers/Auth/actions';

import routes from './routes';
import { AppBody } from './styledComponents';

export const Main = ({
  activeUser,
  data = { test: true },
  deviceView,
  error,
  handleLogin,
  handleLogout,
  isLoggedIn,
  loading,
  match,
}) => (
  <Fragment>
    <Header
      activeUser={activeUser}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      isLoggedIn={isLoggedIn}
      view={deviceView}
    />
    <AppBody>
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
  handleLogin: T.func,
  handleLogout: T.func,
  isLoggedIn: T.bool,
  loading: T.bool,
  match: T.object,
};

const mapStateToProps = createStructuredSelector({
  activeUser: makeSelectActiveUser('activeUser'),
  isLoggedIn: makeSelectActiveUser('isLoggedIn'),
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const mapDispatchToProps = dispatch => ({
  /**
   * Auth
   */
  handleLogin: payload => dispatch(login(payload)),
  handleLogout: payload => dispatch(logout(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(Main));
