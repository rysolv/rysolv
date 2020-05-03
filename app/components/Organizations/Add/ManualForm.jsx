import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { organizationDataDictionary } from 'containers/Organizations/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { organizationUrl, description, logo, name, repoUrl } = data;
  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!name.error}
        helperText={name.error}
        label={organizationDataDictionary.name}
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
        label={organizationDataDictionary.description}
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
        label={organizationDataDictionary.logo}
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
          error={!!organizationUrl.error}
          helperText={organizationUrl.error}
          label={organizationDataDictionary.organizationUrl}
          onChange={e =>
            handleInputChange({
              field: 'organizationUrl',
              form: 'data',
              value: e.target.value,
            })
          }
          value={organizationUrl.value}
        />
        <MainTextInput
          error={!!repoUrl.error}
          helperText={repoUrl.error}
          label={organizationDataDictionary.repoUrl}
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
