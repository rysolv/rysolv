import React from 'react';
import T from 'prop-types';
import BaseTextInput from './BaseTextInput';
import { FlatIconButton } from '../Buttons';

const BaseTextInputWithAdornment = ({
  adornmentComponent,
  InputProps,
  position,
  ...restProps
}) => {
  const adornment = {
    [`${position}Adornment`]: (
      <FlatIconButton Icon={adornmentComponent}>
        {adornmentComponent}
      </FlatIconButton>
    ),
  };
  return (
    <BaseTextInput
      InputProps={{ ...adornment, ...InputProps }}
      {...restProps}
    />
  );
};

BaseTextInputWithAdornment.defaultProps = { position: 'start' };

BaseTextInputWithAdornment.propTypes = {
  adornmentComponent: T.node.isRequired,
  InputProps: T.object,
  position: T.oneOf(['end', 'start']),
};

export default BaseTextInputWithAdornment;
