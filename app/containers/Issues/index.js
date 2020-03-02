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
import { clearAlerts, deleteIssue, fetchIssues } from './actions';
import {
  makeSelectIssues,
  makeSelectIssuesError,
  makeSelectIssuesLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Issues extends React.PureComponent {
  componentDidMount() {
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
      handleClearAlerts,
      issues,
      dispatchDeleteIssues,
      error,
      handleNav,
      loading,
    } = this.props;

    return (
      <AsyncRender
        asyncData={issues}
        component={IssueCard}
        error={error}
        loading={loading}
        propsToPassDown={{
          alerts,
          handleClearAlerts,
          handleDelete: dispatchDeleteIssues,
          handleNav,
        }}
      />
    );
  }
}

Issues.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  issues: T.array,
  dispatchDeleteIssues: T.func,
  dispatchFetchIssues: T.func,
  error: T.oneOfType([T.object, T.bool]),
  handleClearAlerts: T.func,
  handleNav: T.func,
  loading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  alerts: makeSelectIssues('alerts'),
  issues: makeSelectIssues('issues'),
  error: makeSelectIssuesError('issues'),
  loading: makeSelectIssuesLoading('issues'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchDeleteIssues: payload => dispatch(deleteIssue(payload)),
    dispatchFetchIssues: () => dispatch(fetchIssues()),
    handleClearAlerts: () => dispatch(clearAlerts()),
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

// magic
const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

// Adds store to issues
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Issues);
