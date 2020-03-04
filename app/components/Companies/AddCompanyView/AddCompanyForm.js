import React, { Fragment } from 'react';
import T from 'prop-types';

import { MainTextInput, PrimaryButton } from 'components/base_ui';

import { companyDataDictionary } from 'containers/Companies/constants';

// eslint-disable-next-line arrow-body-style
const AddCompanyForm = ({
  data,
  handleIncrementStep,
  handleInputChange,
  isDisabled,
}) => {
  // eslint-disable-next-line no-param-reassign
  const tempData = { ...data };
  delete tempData.importUrl;
  return (
    <Fragment>
      <div>Add Company</div>
      {Object.keys(tempData).map(input => (
        <MainTextInput
          key={`textField-${input}`}
          error={!!input.error}
          helperText={input.error}
          label={companyDataDictionary[input]}
          onChange={e =>
            handleInputChange({ field: input, value: e.target.value })
          }
          required
          value={input.value}
        />
      ))}
      <PrimaryButton
        disabled={isDisabled}
        label="Next"
        onClick={() => handleIncrementStep({ step: 3 })}
      />
    </Fragment>
  );
};

AddCompanyForm.propTypes = {
  data: T.object.isRequired,
  handleIncrementStep: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  isDisabled: T.bool.isRequired,
};

export default AddCompanyForm;
