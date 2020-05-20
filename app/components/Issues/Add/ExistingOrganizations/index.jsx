/* eslint-disable indent */
import React from 'react';
import T from 'prop-types';
import { CheckboxWithLabel, ConditionalRender } from 'components/base_ui';

import {
  StyledExistingOrganizations,
  OrganizationCard,
} from './styledComponents';

const ExistingOrganziations = ({
  activeUser,
  organizationData,
  handleInputChange,
  handleUpdateOrganization,
  handleClearOrganization,
}) => {
  const hadOrganizations =
    activeUser.organizations && activeUser.organizations.length > 0;

  const unselect = () => {
    handleClearOrganization();
    handleInputChange({
      field: 'organizationId',
      form: 'organizationData',
      value: '',
    });
  };

  const handleSelect = id => {
    activeUser.organizations.forEach(el => {
      if (el.id === id) {
        const selectedOrganization = {
          organizationId: { error: '', value: el.id },
          organizationUrl: { error: '', value: el.organizationUrl },
          organizationDescription: { error: '', value: el.description },
          organizationRepo: { error: '', value: el.repoUrl },
          importUrl: { error: '', value: '' },
          organizationName: { error: '', value: el.name },
        };

        handleUpdateOrganization(selectedOrganization);
      }
    });

    handleInputChange({
      field: 'organizationId',
      form: 'organizationData',
      value: id,
    });
  };

  const userOrganizations = activeUser.organizations.map(el => {
    const checked = el.id === organizationData.organizationId.value;

    return (
      <OrganizationCard key={el.id}>
        <CheckboxWithLabel
          checked={checked}
          disabled={false}
          label={el.name}
          onChange={() => (checked ? unselect() : handleSelect(el.id))}
        />
      </OrganizationCard>
    );
  });

  const OrganizationList = (
    <StyledExistingOrganizations>
      {userOrganizations}
    </StyledExistingOrganizations>
  );

  const NoOrganizations = (
    <StyledExistingOrganizations>No organizations</StyledExistingOrganizations>
  );

  return (
    <ConditionalRender
      Component={OrganizationList}
      FallbackComponent={NoOrganizations}
      shouldRender={hadOrganizations}
    />
  );
};

ExistingOrganziations.propTypes = {
  activeUser: T.object,
  handleClearOrganization: T.func,
  handleInputChange: T.func,
  handleUpdateOrganization: T.func,
  organizationData: T.object,
};

export default ExistingOrganziations;
