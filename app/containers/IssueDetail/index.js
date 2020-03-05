import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import IssueDetail from '../../components/IssueDetail';
import { clearAlerts, fetchIssueDetail } from './actions';
import {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssueDetailLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class IssueDetailContainer extends React.PureComponent {
  componentDidMount() {
    const { dispatchFetchIssueDetail } = this.props;
    const id = this.props.match.params;
    dispatchFetchIssueDetail({ id });
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      // alerts,
      // handleClearAlerts,
      issueDetail,
      error,
      loading,
    } = this.props;

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
  match: T.shape({
    params: T.shape({
      field1: T.number,
    }),
  }),
  error: T.bool,
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// magic
const withReducer = injectReducer({ key: 'issueDetail', reducer });
const withSaga = injectSaga({ key: 'issueDetail', saga });

// Adds store to issueDetail
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IssueDetailContainer);
