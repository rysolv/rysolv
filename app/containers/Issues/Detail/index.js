import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';

import IssueDetail from 'components/IssueDetail';
import { clearAlerts, fetchIssueDetail, upvoteIssue } from '../actions';
import {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssueDetailLoading,
} from '../selectors';

export class IssueDetailContainer extends React.PureComponent {
  componentDidMount() {
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
    const { error, handleNav, handleUpvote, issueDetail, loading } = this.props;

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
        }}
      />
    );
  }
}

IssueDetailContainer.propTypes = {
  dispatchFetchIssueDetail: T.func,
  error: T.oneOfType([T.bool, T.object]),
  handleClearAlerts: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  issueDetail: T.object,
  loading: T.bool,
  match: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : IssueDetail
   */
  issueDetail: makeSelectIssueDetail('issueDetail'),
  error: makeSelectIssueDetailError('issueDetail'),
  loading: makeSelectIssueDetailLoading('issueDetail'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : IssueDetail
     */
    dispatchFetchIssueDetail: payload => dispatch(fetchIssueDetail(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleUpvote: payload => dispatch(upvoteIssue(payload)),
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
