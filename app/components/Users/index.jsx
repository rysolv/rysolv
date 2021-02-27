import React, { Fragment } from 'react';
import T from 'prop-types';

import { Pagination } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import MobileUserCard from './Card/MobileView';
import UserCard from './Card';

const Users = ({ data, deviceView, handleNav, path }) => {
  const { length } = data;
  const hasUsers = length > 0 && !data.includes(null);
  const isMobile =
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  const propsToPassDown = {
    data,
    deviceView,
    handleNav,
    path,
    perPage: 48,
    result: `${length} ${length === 1 ? 'User' : 'Users'}`,
  };
  const UserCardToRender = !isMobile ? UserCard : MobileUserCard;
  const viewToRender = hasUsers ? (
    <Pagination
      Component={UserCardToRender}
      propsToPassDown={propsToPassDown}
    />
  ) : (
    <EmptyCard />
  );
  return <Fragment>{viewToRender}</Fragment>;
};

Users.propTypes = {
  data: T.array.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  path: T.string.isRequired,
};

export default Users;
