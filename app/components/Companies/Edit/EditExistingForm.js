import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { MainTextInput } from 'components/base_ui';
import { companyDataDictionary } from 'containers/Companies/constants';

import { InputFormWrapper } from './styledComponents';

const EditExistingForm = ({ editInfo, handleInputChange }) => {
  const tempEditInfo = omit(editInfo, [
    'id',
    'createdDate',
    'modifiedDate',
    'verified',
  ]);
  return (
    <InputFormWrapper>
      {Object.keys(tempEditInfo).map(info => {
        const { error, value } = tempEditInfo[info];
        const isDisabled = info === 'issues' || info === 'pullRequests';
        return (
          <MainTextInput
            key={`input-${info}`}
            disabled={isDisabled}
            error={!!error}
            helperText={error}
            label={companyDataDictionary[info]}
            onChange={e =>
              handleInputChange({
                field: info,
                form: 'editInfo',
                value: e.target.value,
              })
            }
            value={Array.isArray(value) ? value.length : value}
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
