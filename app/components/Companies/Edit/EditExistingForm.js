import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { MainTextInput } from 'components/base_ui';
import { companyDataDictionary } from 'containers/Companies/constants';

import { InputFormWrapper } from './styledComponents';

const EditExistingForm = ({ editInfo, handleInputChange }) => {
  const tempEditInfo = omit(editInfo, ['id', 'lastPostDate']);
  return (
    <InputFormWrapper>
      {Object.keys(tempEditInfo).map(info => {
        const isDisabled = info === 'issues' || info === 'pullRequests';
        return (
          <MainTextInput
            key={`input-${info}`}
            disabled={isDisabled}
            error={!!tempEditInfo[info].error}
            helperText={tempEditInfo[info].error}
            label={companyDataDictionary[info]}
            onChange={e =>
              handleInputChange({
                field: info,
                form: 'companyInfo',
                value: e.target.value,
              })
            }
            value={tempEditInfo[info].value}
          />
        );
      })}
    </InputFormWrapper>
  );
};

EditExistingForm.propTypes = {
  editInfo: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default EditExistingForm;
