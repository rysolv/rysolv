import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { repoDataDictionary } from 'containers/Repos/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

const RepoForm = ({ handleInputChange, repoData }) => {
  const {
    organizationDescription,
    organizationId,
    organizationName,
    organizationRepo,
    organizationUrl,
  } = repoData;
  const idSelected = organizationId.value !== '';

  return (
    <InputFormWrapper>
      <MainTextInput
        disabled={idSelected}
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
        disabled={idSelected}
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
          disabled={idSelected}
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
          disabled={idSelected}
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

RepoForm.propTypes = {
  handleInputChange: T.func.isRequired,
  repoData: T.object.isRequired,
};

export default RepoForm;
