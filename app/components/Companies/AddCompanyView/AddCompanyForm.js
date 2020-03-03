import React, { Fragment } from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';

import { manualAddForm } from './constants';

// eslint-disable-next-line arrow-body-style
const AddCompanyForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const tempData = { ...data };
  delete tempData.importUrl;
  return (
    <Fragment>
      {Object.keys(tempData).map(input => (
        <MainTextInput
          key={`textField-${input}`}
          error={!!input.error}
          helperText={input.error}
          label={manualAddForm[input]}
          onChange={e =>
            handleInputChange({ field: input, value: e.target.value })
          }
          required
          value={input.value}
        />
      ))}
    </Fragment>
  );
};

AddCompanyForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default AddCompanyForm;
