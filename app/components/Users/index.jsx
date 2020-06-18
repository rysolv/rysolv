/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import MobileUserCard from './Card/MobileView';
import UserCard from './Card';

const Users = ({ data, deviceView, handleNav }) => {
  const hasUsers = data.length > 0 && !data.includes(null);
  const isMobile = deviceView === 'mobileS' || deviceView === 'mobileXS';
  const propsToPassDown = {
    data,
    deviceView,
    handleNav,
  };
  const UserCardToRender = (
    <ConditionalRender
      Component={UserCard}
      FallbackComponent={MobileUserCard}
      propsToPassDown={{ ...propsToPassDown }}
      shouldRender={!isMobile}
    />
  );
  const viewToRender = hasUsers ? UserCardToRender : <EmptyCard />;
  return <Fragment>{viewToRender}</Fragment>;
};

Users.propTypes = {
  data: T.array,
  deviceView: T.string.isRequired,
  handleNav: T.func,
};

export default Users;
