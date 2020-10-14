import React, { useState } from 'react';

import iconDictionary from 'utils/iconDictionary';

import BaseTextInputWithAdornment from './BaseTextInputWithAdornment';
import { Spacer, StyledFormControl } from './styledComponents';

const VisibilityIcon = iconDictionary('visibility');
const VisibilityOffIcon = iconDictionary('visibilityOff');

const PasswordTextInput = ({ ...restProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const AdornmentToRender = showPassword ? VisibilityIcon : VisibilityOffIcon;
  const fieldType = showPassword ? 'text' : 'password';

  return (
    <StyledFormControl>
      <BaseTextInputWithAdornment
        adornmentComponent={AdornmentToRender}
        onClick={() => setShowPassword(!showPassword)}
        position="end"
        type={fieldType}
        {...restProps}
      />
      <Spacer />
    </StyledFormControl>
  );
};

export default PasswordTextInput;
