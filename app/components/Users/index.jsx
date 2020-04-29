/* eslint-disable camelcase */
import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import UserCard from './UserCard';
import UserFilter from './UserFilter';
import {
  BannerWrapper,
  UserCardWrapper,
  UserWrapper,
} from './styledComponents';

const Users = ({
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleDeleteUser,
  handleFetchInfo,
  handleInputChange,
  handleNav,
  handleSearchUsers,
  search,
}) => {
  const hasUsers = data.length > 0 && !data.includes(null);
  const route = '/admin/users/add';
  const propsToPassDown = {
    data,
    handleDeleteUser,
    handleFetchInfo,
    handleNav,
  };
  const viewToRender = hasUsers ? (
    <UserCardWrapper>
      <UserCard {...propsToPassDown} />
    </UserCardWrapper>
  ) : (
    <EmptyCard />
  );
  return (
    <div>
      <BannerWrapper>
        <AdminSubHeader
          disabled={disabled}
          handleInputChange={handleInputChange}
          handleNav={handleNav}
          handleSearch={handleSearchUsers}
          route={route}
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <UserWrapper>
        <UserFilter />
        {viewToRender}
      </UserWrapper>
    </div>
  );
};

Users.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  disabled: T.bool.isRequired,
  handleDeleteUser: T.func,
  handleFetchInfo: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchUsers: T.func,
  search: T.object,
};

export default Users;
