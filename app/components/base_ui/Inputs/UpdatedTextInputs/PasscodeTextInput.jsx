import React from 'react';
import T from 'prop-types';

import {
  InputLine,
  InputLineContainer,
  InputText,
  PasscodeInputContainer,
  StyledInput,
} from './styledComponents';

const PasscodeTextInput = ({ length, onChange, onComplete, value }) => {
  const handleChangeInput = e => {
    if (e.target.value.match(/^[0-9]*$/)) {
      if (onChange) {
        onChange(e);
      }

      if (onComplete && e.target.value.length === length) {
        setTimeout(() => {
          onComplete(e);
        }, 100);
      }
    }
  };

  const renderInputLines = () => {
    const elements = [];
    let i = 0;
    const vals = value.split('');
    while (i < length) {
      const isActive = i < value.length;

      elements.push(
        <InputLineContainer key={i}>
          <InputText>{vals[i] || ''}</InputText>
          <InputLine isActive={isActive} />
        </InputLineContainer>,
      );
      i += 1;
    }
    return elements;
  };

  return (
    <PasscodeInputContainer>
      {renderInputLines()}
      <StyledInput
        autoFocus
        maxLength={length}
        onChange={e => handleChangeInput(e)}
        value={value}
      />
    </PasscodeInputContainer>
  );
};

PasscodeTextInput.defaultProps = {
  length: 6,
  onComplete: () => {},
};

PasscodeTextInput.propTypes = {
  length: T.number,
  onChange: T.func.isRequired,
  onComplete: T.func,
  value: T.string.isRequired,
};

export default PasscodeTextInput;
