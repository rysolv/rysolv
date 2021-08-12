import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import StatsView from 'components/Stats';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchDashboardStats } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectStats } from './selectors';

const Stats = ({
  deviceView,
  dispatchFetchDashboardStats,
  error,
  isOverview,
  loading,
  stats,
}) => {
  useEffect(() => {
    dispatchFetchDashboardStats();
  }, []);
  return (
    <AsyncRender
      asyncData={stats}
      component={StatsView}
      error={error}
      isRequiredData
      loading={loading}
      propsToPassDown={{ deviceView, isOverview }}
    />
  );
};

Stats.defaultProps = { isOverview: false };

Stats.propTypes = {
  deviceView: T.string.isRequired,
  dispatchFetchDashboardStats: T.func.isRequired,
  error: T.string,
  isOverview: T.bool,
  loading: T.bool.isRequired,
  stats: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Stats
   */
  error: makeSelectStats('error'),
  loading: makeSelectStats('loading'),
  stats: makeSelectStats('stats'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Stats
     */
    dispatchFetchDashboardStats: () => dispatch(fetchDashboardStats()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'stats', reducer });
const withSaga = injectSaga({ key: 'stats', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Stats);
