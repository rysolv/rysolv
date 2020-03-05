import React, { Fragment } from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { companyDataDictionary } from 'containers/Companies/constants';

import {
  HorizontalWrapper,
  InputFormWrapper,
  StyledH3,
} from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { companyUrl, description, githubUrl, icon, name } = data;
  return (
    <Fragment>
      <StyledH3>Add Company</StyledH3>
      <InputFormWrapper>
        <MainTextInput
          error={!!name.error}
          helperText={name.error}
          label={companyDataDictionary.name}
          onChange={e =>
            handleInputChange({ field: 'name', value: e.target.value })
          }
          required
          value={name.value}
        />
        <MainTextInput
          error={!!description.error}
          helperText={description.error}
          label={companyDataDictionary.description}
          onChange={e =>
            handleInputChange({ field: 'description', value: e.target.value })
          }
          required
          value={description.value}
        />
        <MainTextInput
          error={!!icon.error}
          helperText={icon.error}
          label={companyDataDictionary.icon}
          onChange={e =>
            handleInputChange({ field: 'icon', value: e.target.value })
          }
          required
          value={icon.value}
        />
        <HorizontalWrapper>
          <MainTextInput
            error={!!companyUrl.error}
            helperText={companyUrl.error}
            label={companyDataDictionary.companyUrl}
            onChange={e =>
              handleInputChange({ field: 'companyUrl', value: e.target.value })
            }
            required
            value={companyUrl.value}
          />
          <MainTextInput
            error={!!githubUrl.error}
            helperText={githubUrl.error}
            label={companyDataDictionary.githubUrl}
            onChange={e =>
              handleInputChange({ field: 'githubUrl', value: e.target.value })
            }
            required
            value={githubUrl.value}
          />
        </HorizontalWrapper>
      </InputFormWrapper>
    </Fragment>
  );
};

ManualForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;
