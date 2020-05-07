/* eslint-disable camelcase */
import React from 'react';
import T from 'prop-types';

import { ErrorSuccessBanner } from 'components/base_ui';

import EmptyCard from './EmptyCard';
import UserCard from './Card';
import {
  BannerWrapper,
  OverviewWrapper,
  UserCardWrapper,
  UserWrapper,
} from './styledComponents';

const Users = ({
  alerts: { error, success },
  clearAlerts,
  data,
  handleNav,
}) => {
  const hasUsers = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    data,
    handleNav,
  };
  const viewToRender = hasUsers ? (
    <UserCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <OverviewWrapper>
      <UserWrapper>
        <div>
          <BannerWrapper>
            <ErrorSuccessBanner
              error={error}
              onClose={clearAlerts}
              success={success}
            />
          </BannerWrapper>
          <UserCardWrapper>{viewToRender}</UserCardWrapper>
        </div>
      </UserWrapper>
    </OverviewWrapper>
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
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchUsers: T.func,
  search: T.object,
};

export default Users;
