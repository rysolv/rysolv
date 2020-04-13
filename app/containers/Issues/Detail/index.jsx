import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';

import IssueDetail from 'components/IssueDetail';
import { clearAlerts, fetchIssueDetail } from '../actions';
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
    const { issueDetail, error, loading } = this.props;

    return (
      <AsyncRender
        asyncData={{ issueDetail }}
        component={IssueDetail}
        error={error}
        loading={loading}
      />
    );
  }
}

IssueDetailContainer.propTypes = {
  issueDetail: T.object,
  match: T.object,
  error: T.oneOfType([T.bool, T.object]),
  loading: T.bool,
  handleClearAlerts: T.func,
  dispatchFetchIssueDetail: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : IssueDetail
   */
  alerts: makeSelectIssueDetail('alerts'),
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
