/* eslint-disable camelcase */
import React from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import SubHeader from 'components/SubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';
import Filter from 'components/Filter';
import autocompleteDictionary from 'utils/autocompleteDictionary';

import EmptyCard from './EmptyCard';
import UserCard from './Card';
import {
  BannerWrapper,
  CardTitle,
  FilterContainer,
  OverviewWrapper,
  SubHeaderWrapper,
  UserCardWrapper,
  UserWrapper,
} from './styledComponents';

const Users = ({
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleInputChange,
  handleNav,
  handleSearchUsers,
  search,
}) => {
  const hasUsers = data.length > 0 && !data.includes(null);
  const route = '/users/add';
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
      <SubHeaderWrapper>
        <SubHeader initialValue={2} handleNav={handleNav} />
      </SubHeaderWrapper>
      <CardTitle>Find Users</CardTitle>
      <UserWrapper>
        <FilterContainer>
          <Filter languageOptions={autocompleteDictionary.language} />
        </FilterContainer>
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
