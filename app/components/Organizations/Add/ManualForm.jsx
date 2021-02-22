import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { repoDataDictionary } from 'containers/Organizations/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

const ManualForm = ({ handleInputChange, repoData }) => {
  const {
    organizationDescription,
    organizationName,
    organizationRepo,
    organizationUrl,
  } = repoData;
  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!organizationName.error}
        helperText={organizationName.error}
        label={repoDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'organizationName',
            form: 'repoData',
            value: e.target.value,
          })
        }
        value={organizationName.value}
      />
      <MainTextInput
        error={!!organizationDescription.error}
        helperText={organizationDescription.error}
        label={repoDataDictionary.description}
        onChange={e =>
          handleInputChange({
            field: 'organizationDescription',
            form: 'repoData',
            value: e.target.value,
          })
        }
        value={organizationDescription.value}
      />
      <HorizontalWrapper>
        <MainTextInput
          error={!!organizationUrl.error}
          helperText={organizationUrl.error}
          label={repoDataDictionary.organizationUrl}
          onChange={e =>
            handleInputChange({
              field: 'organizationUrl',
              form: 'repoData',
              value: e.target.value,
            })
          }
          value={organizationUrl.value}
        />
        <MainTextInput
          error={!!organizationRepo.error}
          helperText={organizationRepo.error}
          label={repoDataDictionary.repoUrl}
          onChange={e =>
            handleInputChange({
              field: 'organizationRepo',
              form: 'repoData',
              value: e.target.value,
            })
          }
          value={organizationRepo.value}
        />
      </HorizontalWrapper>
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  handleInputChange: T.func.isRequired,
  repoData: T.object.isRequired,
};

export default ManualForm;
