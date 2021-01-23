import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import UserDetailView from 'components/Users/Detail/UserDetailView';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchInfo, inputChange, resetState } from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectUsers,
  makeSelectUserDetail,
  makeSelectUsersError,
  makeSelectUsersLoading,
} from '../selectors';
import { DetailWrapper } from './styledComponents';

const UsersDetail = ({
  data,
  dispatchFetchInfo,
  dispatchResetState,
  error,
  filterValues,
  handleInputChange,
  loading,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => dispatchResetState, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'User Detail';
    dispatchFetchInfo({ userId: id });
  }, [id]);

  return (
    <DetailWrapper>
      <AsyncRender
        asyncData={data}
        component={UserDetailView}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          filterValues,
          handleInputChange,
        }}
      />
    </DetailWrapper>
  );
};

UsersDetail.propTypes = {
  data: T.object,
  dispatchFetchInfo: T.func,
  dispatchResetState: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]).isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Users
   */
  data: makeSelectUserDetail(),
  error: makeSelectUsersError('fetchUser'),
  filterValues: makeSelectUsers('filter'),
  loading: makeSelectUsersLoading('fetchUser'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Users
     */
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchResetState: () => dispatch(resetState()),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UsersDetail);
