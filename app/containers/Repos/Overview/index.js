import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import Repos from 'components/Repos';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { clearAlerts, fetchRepos, resetState, searchRepos } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectRepos,
  makeSelectReposError,
  makeSelectReposFiltered,
  makeSelectReposLoading,
} from '../selectors';

const ReposOverview = ({
  alerts,
  dispatchFetchRepos,
  dispatchResetState,
  error,
  handleClearAlerts,
  handleNav,
  handleSearchRepos,
  loading,
  match,
  repos,
}) => {
  const {
    params: { searchValue },
    path,
  } = match;
  useEffect(() => dispatchResetState, []);

  useEffect(() => {
    if (searchValue) {
      handleSearchRepos({ value: searchValue });
    } else {
      dispatchFetchRepos();
    }
    return handleClearAlerts;
  }, [searchValue]);

  return (
    <AsyncRender
      asyncData={repos}
      component={Repos}
      error={error}
      loading={loading}
      propsToPassDown={{
        alerts,
        handleClearAlerts,
        handleNav,
        path,
      }}
    />
  );
};

ReposOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  dispatchFetchRepos: T.func,
  dispatchResetState: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]),
  handleClearAlerts: T.func,
  handleNav: T.func.isRequired,
  handleSearchRepos: T.func,
  loading: T.bool,
  match: T.object.isRequired,
  repos: T.array,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Repos
   */
  alerts: makeSelectRepos('alerts'),
  error: makeSelectReposError('repos'),
  loading: makeSelectReposLoading('repos'),
  repos: makeSelectReposFiltered(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Repos
     */
    dispatchFetchRepos: () => dispatch(fetchRepos()),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleSearchRepos: payload => dispatch(searchRepos(payload)),
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

const withReducer = injectReducer({ key: 'repos', reducer });
const withSaga = injectSaga({ key: 'repos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReposOverview);
