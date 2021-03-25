import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import NotFoundPage from 'components/NotFoundPage';
import RepoDetailView from 'components/Repos/Detail';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { openModalState } from 'containers/Main/actions';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  fetchInfo,
  inputChange,
  resetState,
  updateInfo,
  upvoteIssue,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectRepos,
  makeSelectReposError,
  makeSelectReposFormattedData,
  makeSelectReposLoading,
} from '../selectors';

export class ReposDetail extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Repo Detail';
    const {
      dispatchFetchInfo,
      match: {
        params: { id },
      },
    } = this.props;
    dispatchFetchInfo({ itemId: id });
  }

  componentWillUnmount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  render() {
    const {
      activeUser,
      alerts,
      data,
      deviceView,
      dispatchEditRepo,
      dispatchOpenModal,
      dispatchUpvote,
      error,
      filterValues,
      handleClearAlerts,
      handleInputChange,
      handleNav,
      isNotFound,
      isSignedIn,
      loading,
      upvoteLoading,
    } = this.props;

    const handleUpvote = ({ issueId, upvote }) => {
      if (!upvoteLoading) dispatchUpvote({ issueId, upvote });
    };

    return (
      <ConditionalRender
        Component={
          <AsyncRender
            asyncData={data}
            component={RepoDetailView}
            error={error}
            isRequiredData
            loading={loading}
            propsToPassDown={{
              activeUser,
              alerts,
              deviceView,
              dispatchEditRepo,
              dispatchOpenModal,
              filterValues,
              handleClearAlerts,
              handleInputChange,
              handleNav,
              handleUpvote,
              isSignedIn,
            }}
          />
        }
        FallbackComponent={NotFoundPage}
        shouldRender={!isNotFound}
      />
    );
  }
}

ReposDetail.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  data: T.object,
  deviceView: T.string.isRequired,
  dispatchEditRepo: T.func.isRequired,
  dispatchFetchInfo: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchUpvote: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]).isRequired,
  filterValues: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
  isNotFound: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  upvoteLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /**
   * Reducer : Repos
   */
  alerts: makeSelectRepos('alerts'),
  data: makeSelectReposFormattedData(),
  error: makeSelectReposError('fetchRepo'),
  filterValues: makeSelectRepos('filter'),
  isNotFound: makeSelectRepos('isNotFound'),
  loading: makeSelectReposLoading('fetchRepo'),
  upvoteLoading: makeSelectReposLoading('upvoteIssue'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchUpvote: payload => dispatch(upvoteIssue(payload)),
    /*
     * Reducer : Main
     */
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
    /**
     * Reducer : Repos
     */
    dispatchEditRepo: payload => dispatch(updateInfo(payload)),
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchResetState: () => dispatch(resetState()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleInputChange: payload => dispatch(inputChange(payload)),
    /**
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
)(ReposDetail);
