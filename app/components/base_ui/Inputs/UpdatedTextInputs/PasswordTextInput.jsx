import React, { useState } from 'react';

import iconDictionary from 'utils/iconDictionary';

import TextInput from './TextInput';
import { StyledIconButton } from './styledComponents';

const VisibilityIcon = iconDictionary('visibility');
const VisibilityOffIcon = iconDictionary('visibilityOff');

const PasswordTextInput = props => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? 'text' : 'password';
  const IconToRender = showPassword ? VisibilityIcon : VisibilityOffIcon;

  const AdornmentComponent = (
    <StyledIconButton onClick={() => setShowPassword(!showPassword)}>
      {IconToRender}
    </StyledIconButton>
  );

  return <TextInput Adornment={AdornmentComponent} type={type} {...props} />;
};

export default PasswordTextInput;
