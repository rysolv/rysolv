import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import UserDetailView from 'components/Users/Detail/UserDetailView';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchInfo, inputChange } from '../actions';
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
  error,
  filterValues,
  handleInputChange,
  handleNav,
  loading,
  match: {
    params: { id },
  },
}) => {
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
          handleNav,
        }}
      />
    </DetailWrapper>
  );
};

UsersDetail.propTypes = {
  data: T.object,
  dispatchFetchInfo: T.func,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func.isRequired,
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
    handleInputChange: payload => dispatch(inputChange(payload)),
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

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UsersDetail);
