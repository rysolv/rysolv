import React from 'react';
import T from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import BaseInput from './BaseInput';

const BaseInputWithAdornment = ({
  adornmentComponent,
  position,
  ...restProps
}) => {
  const adornment = {
    [`${position}Adornment`]: (
      <InputAdornment position={position}>{adornmentComponent}</InputAdornment>
    ),
  };
  return <BaseInput {...adornment} {...restProps} />;
};

BaseInputWithAdornment.defaultProps = { position: 'start' };

BaseInputWithAdornment.propTypes = {
  adornmentComponent: T.node.isRequired,
  position: T.oneOf(['end', 'start']),
};

export default BaseInputWithAdornment;
