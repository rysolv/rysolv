import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AddPullRequestModal from 'components/AddPullRequestModal';
import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import EmbedIssueModal from 'components/EmbedIssueModal';
import IssueDetail from 'components/Issues/Detail';
import {
  fetchAttemptList,
  fetchPullRequestList,
  fetchWatchList,
  openModalState,
} from 'containers/Main/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  addAttempt,
  addComment,
  addWatch,
  clearAlerts,
  closeIssue,
  closeIssueModalState,
  editIssue,
  fetchIssueDetail,
  openIssueModalState,
  resetState,
  upvoteIssue,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssues,
  makeSelectIssuesLoading,
} from '../selectors';

export class IssuesDetail extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Issue Detail';
    const {
      dispatchFetchIssueDetail,
      match: {
        params: { id },
      },
    } = this.props;
    dispatchFetchIssueDetail({ id });
  }

  componentWillUnmount() {
    const { dispatchResetState } = this.props;
    dispatchResetState();
  }

  render() {
    const {
      activeUser,
      addWatching,
      alerts,
      deviceView,
      dispatchCloseIssue,
      dispatchCloseIssueModal,
      dispatchEditIssue,
      dispatchFetchAttemptList,
      dispatchFetchPullRequestList,
      dispatchFetchWatchList,
      dispatchOpenIssueModal,
      dispatchOpenModal,
      dispatchUpvote,
      error,
      handleClearAlerts,
      handleComment,
      handleIncrement,
      isModalOpen,
      isSignedIn,
      issueDetail,
      loading,
      match: {
        params: { id },
      },
      modal,
      upvoteLoading,
    } = this.props;

    const handleUpvote = ({ issueId, upvote }) => {
      if (!upvoteLoading) dispatchUpvote({ issueId, upvote });
    };

    const modalPropsDictionary = {
      addPullRequest: {
        Component: AddPullRequestModal,
        open: isModalOpen,
        propsToPassDown: {
          handleClose: dispatchCloseIssueModal,
          issueId: id,
        },
      },
      embedIssue: {
        Component: EmbedIssueModal,
        open: isModalOpen,
        propsToPassDown: {
          deviceView,
          handleClose: dispatchCloseIssueModal,
          issueId: id,
        },
      },
    };

    return (
      <Fragment>
        <AsyncRender
          asyncData={issueDetail}
          component={IssueDetail}
          error={error}
          loading={loading}
          isRequiredData
          propsToPassDown={{
            activeUser,
            addWatching,
            alerts,
            deviceView,
            dispatchCloseIssue,
            dispatchEditIssue,
            dispatchFetchAttemptList,
            dispatchFetchPullRequestList,
            dispatchFetchWatchList,
            dispatchOpenIssueModal,
            dispatchOpenModal,
            handleClearAlerts,
            handleComment,
            handleIncrement,
            handleUpvote,
            isSignedIn,
          }}
        />
        {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
      </Fragment>
    );
  }
}

IssuesDetail.propTypes = {
  activeUser: T.object,
  addWatching: T.func,
  alerts: T.object,
  deviceView: T.string,
  dispatchCloseIssue: T.func,
  dispatchCloseIssueModal: T.func,
  dispatchEditIssue: T.func,
  dispatchFetchAttemptList: T.func,
  dispatchFetchIssueDetail: T.func,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  dispatchResetState: T.func.isRequired,
  dispatchUpvote: T.func,
  error: T.oneOfType([T.bool, T.string]),
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  isModalOpen: T.bool,
  isSignedIn: T.bool,
  issueDetail: T.object,
  loading: T.bool,
  match: T.object,
  modal: T.string,
  upvoteLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /**
   * Reducer : Issues
   */
  alerts: makeSelectIssues('alerts'),
  error: makeSelectIssueDetailError('issueDetail'),
  isModalOpen: makeSelectIssues('isModalOpen'),
  issueDetail: makeSelectIssueDetail('issueDetail'),
  loading: makeSelectIssuesLoading('issueDetail'),
  modal: makeSelectIssues('modal'),
  upvoteLoading: makeSelectIssuesLoading('upvoteIssue'),
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
    addWatching: payload => dispatch(addWatch(payload)),
    dispatchCloseIssue: payload => dispatch(closeIssue(payload)),
    dispatchCloseIssueModal: () => dispatch(closeIssueModalState()),
    dispatchEditIssue: payload => dispatch(editIssue(payload)),
    dispatchFetchIssueDetail: payload => dispatch(fetchIssueDetail(payload)),
    dispatchOpenIssueModal: payload => dispatch(openIssueModalState(payload)),
    dispatchResetState: () => dispatch(resetState()),
    dispatchUpvote: payload => dispatch(upvoteIssue(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleComment: payload => dispatch(addComment(payload)),
    handleIncrement: payload => dispatch(addAttempt(payload)),
    /*
     * Reducer : Main
     */
    dispatchFetchAttemptList: payload => dispatch(fetchAttemptList(payload)),
    dispatchFetchPullRequestList: payload =>
      dispatch(fetchPullRequestList(payload)),
    dispatchFetchWatchList: payload => dispatch(fetchWatchList(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuesDetail);
