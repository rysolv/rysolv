/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  Input,
  InputWrapper,
  StyledButton,
  StyledIconButton,
  StyledStep,
  StyledStepLabel,
  StyledStepper,
} from './styledComponents';

const DeleteIcon = iconDictionary('close');

const StepperInputOption = ({ handleChangeInput, onBlur, value }) => {
  const formattedValue = value || [''];

  const handleChangeStep = (newValue, index) => {
    const tempArray = [...formattedValue];
    tempArray[index] = newValue;
    handleChangeInput(tempArray);
  };

  const handleDeleteStep = index => {
    if (formattedValue.length > 1) {
      const firstArr = formattedValue.slice(0, index);
      const secondArr = formattedValue.slice(index + 1);
      const tempArray = [...firstArr, ...secondArr];
      handleChangeInput(tempArray);
    }
  };

  return (
    <div>
      <StyledStepper alternativeLabel>
        {formattedValue.map(label => (
          <StyledStep key={label}>
            <StyledStepLabel>{label}</StyledStepLabel>
          </StyledStep>
        ))}
      </StyledStepper>
      {formattedValue.map((arrayValue, index) => (
        <InputWrapper key={`${arrayValue}-${index}`}>
          <Input
            autoFocus="autoFocus"
            height="4.9rem"
            onBlur={onBlur}
            onChange={e => handleChangeStep(e.target.value, index)}
            type="text"
            value={arrayValue}
          />
          <StyledIconButton
            label="delete-step"
            onClick={() => handleDeleteStep(index)}
          >
            {DeleteIcon}
          </StyledIconButton>
        </InputWrapper>
      ))}
      <StyledButton
        disableRipple
        onClick={() => handleChangeInput([...formattedValue, ''])}
      >
        Add interview step
      </StyledButton>
    </div>
  );
};

StepperInputOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.array.isRequired,
};

export default StepperInputOption;
