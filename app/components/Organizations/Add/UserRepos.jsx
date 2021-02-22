import React, { Fragment } from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';

import ImportRepoCard from './ImportRepoCard';
import { TextWrapper, UserReposContainer } from './styledComponents';

const UserRepos = ({ handleInputChange, userRepos, userReposLoading }) => {
  const UserIssueList =
    userRepos &&
    userRepos.map(({ exists, modifiedDate, name, organizationUrl }) => (
      <ImportRepoCard
        key={organizationUrl}
        exists={exists}
        handleInputChange={handleInputChange}
        modifiedDate={modifiedDate}
        name={name}
        organizationUrl={organizationUrl}
      />
    ));

  const NoReposMessage = (
    <TextWrapper>No repos found on this account.</TextWrapper>
  );

  const viewToRender = () => {
    if (userRepos && userRepos.length > 0) return UserIssueList;
    return NoReposMessage;
  };

  return (
    <Fragment>
      My Repos
      <AsyncRender
        component={() => (
          <UserReposContainer>{viewToRender()}</UserReposContainer>
        )}
        loading={userReposLoading}
        propsToPassDown={{
          handleInputChange,
          userRepos,
        }}
      />
    </Fragment>
  );
};

UserRepos.propTypes = {
  handleInputChange: T.func,
  userRepos: T.array,
  userReposLoading: T.bool,
};

export default UserRepos;
