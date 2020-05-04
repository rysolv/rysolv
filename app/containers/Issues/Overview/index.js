import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueCard from 'components/Issues';
import { makeSelectActiveUser } from 'containers/Auth/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  addAttempt,
  clearAlerts,
  deleteIssue,
  fetchIssues,
  inputChange,
  searchIssues,
  upvoteIssue,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
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
    document.title = 'Issues Overview';
    const { dispatchFetchIssues } = this.props;
    dispatchFetchIssues();
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
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
  activeUser: makeSelectActiveUser('activeUser'),
  alerts: makeSelectIssues('alerts'),
  disabled: makeSelectIssuesSearchDisabled(),
  error: makeSelectIssuesError('issues'),
  issues: makeSelectIssues('issues'),
  loading: makeSelectIssuesLoading('issues'),
  search: makeSelectIssues('search'),
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
    handleIncrement: payload => dispatch(addAttempt(payload)),

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

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssuesOverview);
