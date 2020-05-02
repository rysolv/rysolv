import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import UserDetailView from 'components/Users/Detail/UserDetailView';

import { fetchInfo, inputChange } from '../actions';
import {
  makeSelectUsers,
  makeSelectUsersError,
  makeSelectUsersLoading,
} from '../selectors';
import { DetailWrapper } from './styledComponents';

const DetailUser = ({
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
    dispatchFetchInfo({ itemId: id });
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

DetailUser.propTypes = {
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
  data: makeSelectUsers('user'),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailUser);
