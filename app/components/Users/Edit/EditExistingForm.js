import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { MainTextInput } from 'components/base_ui';
import { userDataDictionary } from 'containers/Users/constants';

import { InputFormWrapper } from './styledComponents';

const EditExistingForm = ({ editInfo, handleInputChange }) => {
  const tempEditInfo = omit(editInfo, ['id', 'createdDate']);
  return (
    <InputFormWrapper>
      {Object.keys(tempEditInfo).map(info => {
        const isDisabled =
          info === 'activeNumber' || info === 'issuesNumber' || info === 'rep';
        return (
          <MainTextInput
            key={`input-${info}`}
            disabled={isDisabled}
            error={!!tempEditInfo[info].error}
            helperText={tempEditInfo[info].error}
            label={userDataDictionary[info]}
            onChange={e =>
              handleInputChange({
                field: info,
                form: 'editInfo',
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
