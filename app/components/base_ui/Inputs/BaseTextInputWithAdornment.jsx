import React from 'react';
import T from 'prop-types';
import BaseTextInput from './BaseTextInput';
import { FlatIconButton } from '../Buttons';

const BaseTextInputWithAdornment = ({
  adornmentComponent,
  InputProps,
  onClick,
  position,
  ...restProps
}) => {
  const adornment = {
    [`${position}Adornment`]: (
      <FlatIconButton disableRipple Icon={adornmentComponent} onClick={onClick}>
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
  onClick: T.func,
  position: T.oneOf(['end', 'start']),
};

export default BaseTextInputWithAdornment;
