import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueDetail from 'components/Issues/Detail';
import { makeSelectAuth } from 'containers/Auth/selectors';
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
      error,
      handleComment,
      handleNav,
      handleUpvote,
      issueDetail,
      loading,
      handleIncrement,
    } = this.props;

    return (
      <AsyncRender
        asyncData={issueDetail}
        component={IssueDetail}
        error={error}
        loading={loading}
        isRequiredData
        propsToPassDown={{
          handleNav,
          handleUpvote,
          activeUser,
          handleComment,
          handleIncrement,
        }}
      />
    );
  }
}

IssuesDetail.propTypes = {
  activeUser: T.object,
  dispatchFetchIssueDetail: T.func,
  error: T.oneOfType([T.bool, T.object]),
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  issueDetail: T.object,
  loading: T.bool,
  handleIncrement: T.func,
  match: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  activeUser: makeSelectAuth('activeUser'),
  issueDetail: makeSelectIssueDetail('issueDetail'),
  error: makeSelectIssueDetailError('issueDetail'),
  loading: makeSelectIssueDetailLoading('issueDetail'),
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
