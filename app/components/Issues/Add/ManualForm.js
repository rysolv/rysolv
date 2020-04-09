import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { companyDataDictionary } from 'containers/Companies/constants';

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
        label={companyDataDictionary.name}
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
        label={companyDataDictionary.description}
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
        label={companyDataDictionary.logo}
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
          label={companyDataDictionary.companyUrl}
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
          label={companyDataDictionary.repoUrl}
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
