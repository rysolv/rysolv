import React from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AsyncRender from '../../components/AsyncRender';
import Footer from '../../components/Footer';
import reducer from './reducer';
import routes from './routes';
import saga from './saga';
import { AppBody } from './styledComponents';

export const Main = ({ data, error, loading }) => (
  <div>
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
  error: T.object,
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'main', reducer });
const withSaga = injectSaga({ key: 'main', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(Main),
);
