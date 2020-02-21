import React from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import AsyncRender from '../../components/AsyncRender';
import Routes from './routes';

export const Main = ({ data, error, loading }) => {
  console.log('data');
  return (
    <AsyncRender
      asyncData={data}
      component={Routes}
      error={error}
      loading={loading}
    />
  );
};

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
