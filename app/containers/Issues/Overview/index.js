import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueCard from 'components/Issues';

import { makeSelectAdmin } from 'containers/Admin/selectors';
import {
  clearAlerts,
  deleteIssue,
  fetchIssues,
  inputChange,
  searchIssues,
  upvoteIssue,
  updateArray,
} from '../actions';
import {
  makeSelectIssues,
  makeSelectIssuesError,
  makeSelectIssuesLoading,
  makeSelectIssuesSearchDisabled,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class IssuesOverview extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatchFetchIssues } = this.props;
    dispatchFetchIssues();
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      // dispatchFetchInfo,
      activeUser,
      alerts,
      disabled,
      error,
      handleClearAlerts,
      handleDeleteIssue,
      handleIncrement,
      handleInputChange,
      handleNav,
      handleSearchIssues,
      handleUpvote,
      issues,
      loading,
      search,
    } = this.props;
    return (
      <AsyncRender
        asyncData={issues}
        component={IssueCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          // handleFetchInfo: dispatchFetchInfo,
          activeUser,
          alerts,
          disabled,
          handleClearAlerts,
          handleDeleteIssue,
          handleIncrement,
          handleInputChange,
          handleNav,
          handleSearchIssues,
          handleUpvote,
          search,
        }}
      />
    );
  }
}

IssuesOverview.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  // dispatchFetchInfo: T.func,
  disabled: T.bool,
  dispatchFetchIssues: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleDeleteIssue: T.func,
  handleIncrement: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  handleUpvote: T.func,
  issues: T.array,
  loading: T.bool,
  search: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  alerts: makeSelectIssues('alerts'),
  disabled: makeSelectIssuesSearchDisabled(),
  error: makeSelectIssuesError('issues'),
  loading: makeSelectIssuesLoading('issues'),
  search: makeSelectIssues('search'),
  issues: makeSelectIssues('issues'),
  activeUser: makeSelectAdmin('admin'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Issues
     */
    // dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchFetchIssues: () => dispatch(fetchIssues()),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleDeleteIssue: payload => dispatch(deleteIssue(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleSearchIssues: payload => dispatch(searchIssues(payload)),
    handleUpvote: payload => dispatch(upvoteIssue(payload)),
    handleIncrement: payload => dispatch(updateArray(payload)),

    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

// Adds store to issueDetail
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesOverview);
