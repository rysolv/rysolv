/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import T from 'prop-types';

import EmptyCard from './EmptyCard';
import UserCard from './Card';

const Users = ({ data, deviceView, handleNav }) => {
  const hasUsers = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    deviceView,
    handleNav,
  };
  const viewToRender = hasUsers ? (
    <UserCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return <Fragment>{viewToRender}</Fragment>;
};

Users.propTypes = {
  clearAlerts: T.func,
  data: T.array,
  deviceView: T.string.isRequired,
  disabled: T.bool.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchUsers: T.func,
  search: T.object,
};

export default Users;
