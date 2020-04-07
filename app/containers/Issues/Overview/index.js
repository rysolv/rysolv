import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import IssueCard from 'components/Issues';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  clearAlerts,
  deleteIssue,
  fetchIssues,
  inputChange,
  searchIssues,
} from '../actions';
import {
  makeSelectIssues,
  makeSelectIssuesError,
  makeSelectIssuesLoading,
  makeSelectIssuesSearchDisabled,
} from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

// eslint-disable-next-line react/prefer-stateless-function
export class IssuesOverview extends React.PureComponent {
  componentDidMount() {
    console.log('Issues overview');
    const { dispatchFetchIssues } = this.props;
    dispatchFetchIssues();
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      alerts,
      disabled,
      // dispatchFetchInfo,
      error,
      handleClearAlerts,
      handleDeleteIssue,
      handleInputChange,
      handleNav,
      handleSearchIssues,
      loading,
      search,
      issues,
    } = this.props;
    return (
      <AsyncRender
        asyncData={issues}
        component={IssueCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          disabled,
          handleClearAlerts,
          handleDeleteIssue,
          // handleFetchInfo: dispatchFetchInfo,
          handleInputChange,
          handleNav,
          handleSearchIssues,
          search,
        }}
      />
    );
  }
}

IssuesOverview.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  disabled: T.bool,
  // dispatchFetchInfo: T.func,
  dispatchFetchIssues: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleDeleteIssue: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  loading: T.bool,
  search: T.object,
  issues: T.array,
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
