import React from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import Header from 'components/Header';
import Footer from 'components/Footer';
import makeSelectViewSize from 'containers/ViewSize/selectors';

import routes from './routes';
import { AppBody } from './styledComponents';

export const Main = ({ data = { test: true }, deviceView, error, loading }) => (
  <div>
    <Header view={deviceView} />
    <AppBody>
      <AsyncRender
        asyncData={data}
        component={routes}
        error={error}
        loading={loading}
      />
    </AppBody>
    <Footer />
  </div>
);

Main.propTypes = {
  data: T.object,
  deviceView: T.string,
  error: T.object,
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({
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
