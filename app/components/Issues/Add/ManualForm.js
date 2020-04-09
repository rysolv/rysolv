import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { issueDataDictionary } from 'containers/Issues/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { companyUrl, description, logo, name, repoUrl } = data;
  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!name.error}
        helperText={name.error}
        label={issueDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'name',
            form: 'data',
            value: e.target.value,
          })
        }
        value={name.value}
      />
      <MainTextInput
        error={!!description.error}
        helperText={description.error}
        label={issueDataDictionary.description}
        onChange={e =>
          handleInputChange({
            field: 'description',
            form: 'data',
            value: e.target.value,
          })
        }
        value={description.value}
      />
      <MainTextInput
        error={!!logo.error}
        helperText={logo.error}
        label={issueDataDictionary.logo}
        onChange={e =>
          handleInputChange({
            field: 'logo',
            form: 'data',
            value: e.target.value,
          })
        }
        value={logo.value}
      />
      <HorizontalWrapper>
        <MainTextInput
          error={!!companyUrl.error}
          helperText={companyUrl.error}
          label={issueDataDictionary.companyUrl}
          onChange={e =>
            handleInputChange({
              field: 'companyUrl',
              form: 'data',
              value: e.target.value,
            })
          }
          value={companyUrl.value}
        />
        <MainTextInput
          error={!!repoUrl.error}
          helperText={repoUrl.error}
          label={issueDataDictionary.repoUrl}
          onChange={e =>
            handleInputChange({
              field: 'repoUrl',
              form: 'data',
              value: e.target.value,
            })
          }
          value={repoUrl.value}
        />
      </HorizontalWrapper>
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;
