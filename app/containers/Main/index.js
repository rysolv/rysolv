import React, { Fragment } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Auth from 'containers/Auth/Loadable';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectActiveUser } from 'containers/Auth/selectors';

import routes from './routes';
import { AppBody } from './styledComponents';

export const Main = ({
  activeUser,
  data = { test: true },
  deviceView,
  error,
  loading,
}) => (
  <Fragment>
    <Auth>
      <Header activeUser={activeUser} view={deviceView} />
      <AppBody>
        <AsyncRender
          asyncData={data}
          component={routes}
          error={error}
          loading={loading}
        />
      </AppBody>
      <Footer />
    </Auth>
  </Fragment>
);

Main.propTypes = {
  activeUser: T.object,
  data: T.object,
  deviceView: T.string,
  error: T.object,
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  activeUser: makeSelectActiveUser('activeUser'),
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withRouter(compose(withConnect)(Main));
