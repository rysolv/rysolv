import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import UserCard from './UserCard';
import { BannerWrapper } from './styledComponents';

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
  const hasCompanies = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    handleDeleteUser,
    handleFetchInfo,
    handleNav,
  };
  const viewToRender = hasCompanies ? (
    <UserCard {...propsToPassDown} />
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
          search={search}
        />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      {viewToRender}
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
