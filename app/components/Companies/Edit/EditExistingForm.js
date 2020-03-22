import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { MainTextInput } from 'components/base_ui';
import { companyDataDictionary } from 'containers/Companies/constants';

import { InputFormWrapper } from './styledComponents';

const EditExistingForm = ({ companyInfo, handleInputChange }) => {
  const tempCompanyInfo = omit(companyInfo, ['id', 'lastPostDate']);
  return (
    <InputFormWrapper>
      {Object.keys(tempCompanyInfo).map(info => {
        const isDisabled = info === 'issues' || info === 'pullRequests';
        return (
          <MainTextInput
            key={`input-${info}`}
            disabled={isDisabled}
            error={!!tempCompanyInfo[info].error}
            helperText={tempCompanyInfo[info].error}
            label={companyDataDictionary[info]}
            onChange={e =>
              handleInputChange({
                field: info,
                form: 'companyInfo',
                value: e.target.value,
              })
            }
            value={tempCompanyInfo[info].value}
          />
        );
      })}
    </InputFormWrapper>
  );
};

EditExistingForm.propTypes = {
  companyInfo: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default EditExistingForm;
