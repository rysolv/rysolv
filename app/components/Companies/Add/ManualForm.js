import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { companyDataDictionary } from 'containers/Companies/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { companyUrl, description, githubUrl, icon, name } = data;
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
        error={!!icon.error}
        helperText={icon.error}
        label={companyDataDictionary.icon}
        onChange={e =>
          handleInputChange({
            field: 'icon',
            form: 'data',
            value: e.target.value,
          })
        }
        value={icon.value}
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
          error={!!githubUrl.error}
          helperText={githubUrl.error}
          label={companyDataDictionary.githubUrl}
          onChange={e =>
            handleInputChange({
              field: 'githubUrl',
              form: 'data',
              value: e.target.value,
            })
          }
          value={githubUrl.value}
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
