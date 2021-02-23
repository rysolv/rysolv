import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { repoDataDictionary } from 'containers/Repos/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

const RepoForm = ({ handleInputChange, repoData }) => {
  const {
    organizationUrl,
    repoDescription,
    repoId,
    repoName,
    repoUrl,
  } = repoData;
  const idSelected = repoId.value !== '';

  return (
    <InputFormWrapper>
      <MainTextInput
        disabled={idSelected}
        error={!!repoName.error}
        helperText={repoName.error}
        label={repoDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'repoName',
            form: 'repoData',
            value: e.target.value,
          })
        }
        value={repoName.value}
      />
      <MainTextInput
        disabled={idSelected}
        error={!!repoDescription.error}
        helperText={repoDescription.error}
        label={repoDataDictionary.description}
        onChange={e =>
          handleInputChange({
            field: 'repoDescription',
            form: 'repoData',
            value: e.target.value,
          })
        }
        value={repoDescription.value}
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
          error={!!repoUrl.error}
          helperText={repoUrl.error}
          label={repoDataDictionary.repoUrl}
          onChange={e =>
            handleInputChange({
              field: 'repoUrl',
              form: 'repoData',
              value: e.target.value,
            })
          }
          value={repoUrl.value}
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
