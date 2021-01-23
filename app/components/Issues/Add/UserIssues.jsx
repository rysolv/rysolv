import React, { Fragment } from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';

import ImportIssueCard from './ImportIssueCard';
import { TextWrapper, UserIssuesContainer } from './styledComponents';

const ImportForm = ({ handleInputChange, userIssues, userIssuesLoading }) => {
  const UserIssueList =
    userIssues &&
    userIssues.map(({ createdDate, exists, name, organizationName, repo }) => (
      <ImportIssueCard
        createdDate={createdDate}
        exists={exists}
        handleInputChange={handleInputChange}
        key={repo}
        name={name}
        organizationName={organizationName}
        repo={repo}
      />
    ));

  const NoIssuesMessage = (
    <TextWrapper>No issues on any of your repositories. Nice!</TextWrapper>
  );

  const viewToRender = () => {
    if (userIssues && userIssues.length > 0) return UserIssueList;
    return NoIssuesMessage;
  };

  return (
    <Fragment>
      My Issues
      <AsyncRender
        component={() => (
          <UserIssuesContainer>{viewToRender()}</UserIssuesContainer>
        )}
        loading={userIssuesLoading}
        propsToPassDown={{
          handleInputChange,
          userIssues,
        }}
      />
    </Fragment>
  );
};

ImportForm.propTypes = {
  handleInputChange: T.func,
  userIssues: T.array,
  userIssuesLoading: T.bool,
};

export default ImportForm;
