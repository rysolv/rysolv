import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import { formatLabel } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonGroup,
  Input,
  InputContainer,
  InputDescription,
  InputError,
  InputLabel,
  InputWrapper,
  StyledIconButton,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const InputOption = ({
  error,
  handleEditUser,
  field,
  handleChangeInput,
  onBlur,
  value,
}) => {
  const [edit, setEdit] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleCancel = () => {
    setEdit(false);
    setTempValue(value);
  };

  const handleEdit = () => {
    handleChangeInput(tempValue);
    handleEditUser({ field, value });
    handleCancel();
  };

  return (
    <InputContainer>
      <InputWrapper>
        <InputLabel>{formatLabel(field)}</InputLabel>
        <InputDescription />
        <Input
          disabled={!edit}
          height="4.9rem"
          onBlur={onBlur}
          onChange={e => setTempValue(e.target.value)}
          type="text"
          value={tempValue}
        />
        <InputError>{error}</InputError>
      </InputWrapper>
      <ConditionalRender
        Component={
          <StyledIconButton disableRipple onClick={() => setEdit(true)}>
            {EditIcon}
          </StyledIconButton>
        }
        FallbackComponent={
          <ButtonGroup>
            <StyledPrimaryButton label="Cancel" onClick={handleCancel} />
            <StyledPrimaryAsyncButton label="Edit" onClick={handleEdit} />
          </ButtonGroup>
        }
        shouldRender={!edit}
      />
    </InputContainer>
  );
};

InputOption.propTypes = {
  error: T.string.isRequired,
  field: T.string.isRequired,
  handleChangeInput: T.func.isRequired,
  handleEditUser: T.string.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default InputOption;
