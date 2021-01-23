import React, { Fragment } from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';

import ImportOrganizationCard from './ImportOrganizationCard';
import { TextWrapper, UserOrganizationsContainer } from './styledComponents';

const ImportForm = ({
  handleInputChange,
  userOrganizations,
  userOrganizationsLoading,
}) => {
  const UserIssueList =
    userOrganizations &&
    userOrganizations.map(({ exists, modifiedDate, name, organizationUrl }) => (
      <ImportOrganizationCard
        key={organizationUrl}
        exists={exists}
        handleInputChange={handleInputChange}
        modifiedDate={modifiedDate}
        name={name}
        organizationUrl={organizationUrl}
      />
    ));

  const NoOrganizationsMessage = (
    <TextWrapper>No repos found on this account.</TextWrapper>
  );

  const viewToRender = () => {
    if (userOrganizations && userOrganizations.length > 0) return UserIssueList;
    return NoOrganizationsMessage;
  };

  return (
    <Fragment>
      My Repos
      <AsyncRender
        component={() => (
          <UserOrganizationsContainer>
            {viewToRender()}
          </UserOrganizationsContainer>
        )}
        loading={userOrganizationsLoading}
        propsToPassDown={{
          handleInputChange,
          userOrganizations,
        }}
      />
    </Fragment>
  );
};

ImportForm.propTypes = {
  handleInputChange: T.func,
  userOrganizations: T.array,
  userOrganizationsLoading: T.bool,
};

export default ImportForm;
