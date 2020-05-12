import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { organizationDataDictionary } from 'containers/Organizations/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const OrganizationForm = ({ organization, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const {
    organizationUrl,
    organizationDescription,
    organizationName,
    organizationRepo,
  } = organization;
  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!organizationName.error}
        helperText={organizationName.error}
        label={organizationDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'organizationName',
            form: 'organizationData',
            value: e.target.value,
          })
        }
        value={organizationName.value}
      />
      <MainTextInput
        error={!!organizationDescription.error}
        helperText={organizationDescription.error}
        label={organizationDataDictionary.description}
        onChange={e =>
          handleInputChange({
            field: 'organizationDescription',
            form: 'organizationData',
            value: e.target.value,
          })
        }
        value={organizationDescription.value}
      />
      <HorizontalWrapper>
        <MainTextInput
          error={!!organizationUrl.error}
          helperText={organizationUrl.error}
          label={organizationDataDictionary.organizationUrl}
          onChange={e =>
            handleInputChange({
              field: 'organizationUrl',
              form: 'organizationData',
              value: e.target.value,
            })
          }
          value={organizationUrl.value}
        />
        <MainTextInput
          error={!!organizationRepo.error}
          helperText={organizationRepo.error}
          label={organizationDataDictionary.repoUrl}
          onChange={e =>
            handleInputChange({
              field: 'organizationRepo',
              form: 'organizationData',
              value: e.target.value,
            })
          }
          value={organizationRepo.value}
        />
      </HorizontalWrapper>
    </InputFormWrapper>
  );
};

OrganizationForm.propTypes = {
  handleInputChange: T.func.isRequired,
  organization: T.object.isRequired,
};

export default OrganizationForm;
