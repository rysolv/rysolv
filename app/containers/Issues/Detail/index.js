import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueDetail from 'components/Issues/Detail';
import { fetchWatchList, openModalState } from 'containers/Main/actions';
import { makeSelectAuth } from 'containers/Auth/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  addAttempt,
  addComment,
  clearAlerts,
  fetchIssueDetail,
  upvoteIssue,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssueDetailLoading,
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
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      activeUser,
      deviceView,
      dispatchFetchWatchList,
      dispatchOpenModal,
      error,
      handleComment,
      handleIncrement,
      handleNav,
      handleUpvote,
      isSignedIn,
      issueDetail,
      loading,
    } = this.props;

    return (
      <AsyncRender
        asyncData={issueDetail}
        component={IssueDetail}
        error={error}
        loading={loading}
        isRequiredData
        propsToPassDown={{
          activeUser,
          deviceView,
          dispatchFetchWatchList,
          dispatchOpenModal,
          handleComment,
          handleIncrement,
          handleNav,
          handleUpvote,
          isSignedIn,
        }}
      />
    );
  }
}

IssuesDetail.propTypes = {
  activeUser: T.object,
  deviceView: T.string,
  dispatchFetchIssueDetail: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  error: T.oneOfType([T.bool, T.object]),
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  issueDetail: T.object,
  loading: T.bool,
  match: T.object,
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
  issueDetail: makeSelectIssueDetail('issueDetail'),
  error: makeSelectIssueDetailError('issueDetail'),
  loading: makeSelectIssueDetailLoading('issueDetail'),
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
    dispatchFetchIssueDetail: payload => dispatch(fetchIssueDetail(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleUpvote: payload => dispatch(upvoteIssue(payload)),
    handleComment: payload => dispatch(addComment(payload)),
    handleIncrement: payload => dispatch(addAttempt(payload)),
    /*
     * Reducer : Main
     */
    dispatchFetchWatchList: payload => dispatch(fetchWatchList(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
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

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuesDetail);
