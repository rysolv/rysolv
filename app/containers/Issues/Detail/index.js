import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';

import IssueDetail from 'components/Issues/Detail';
import { makeSelectActiveUser } from 'containers/Auth/selectors';
import {
  addComment,
  clearAlerts,
  fetchIssueDetail,
  updateArray,
  upvoteIssue,
} from '../actions';
import {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssueDetailLoading,
} from '../selectors';

export class IssueDetailContainer extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
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

IssueDetailContainer.propTypes = {
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
  activeUser: makeSelectActiveUser('activeUser'),
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
    handleIncrement: payload => dispatch(updateArray(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

// Adds store to issueDetail
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueDetailContainer);
