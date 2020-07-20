import React from 'react';
import T from 'prop-types';

import BaseInput from './BaseInput';
import { StyledModalIcon } from './styledComponents';

const BaseInputWithAdornment = ({
  adornmentComponent,
  disabled,
  fontSize,
  onClick,
  position,
  ...restProps
}) => {
  const adornment = {
    [`${position}Adornment`]: (
      <StyledModalIcon fontSize={fontSize} Icon={adornmentComponent}>
        {adornmentComponent}
      </StyledModalIcon>
    ),
  };
  return <BaseInput {...adornment} {...restProps} />;
};

BaseInputWithAdornment.defaultProps = { position: 'start' };

BaseInputWithAdornment.propTypes = {
  adornmentComponent: T.node,
  disabled: T.bool,
  fontSize: T.string,
  onClick: T.func,
  position: T.oneOf(['end', 'start']),
};

export default BaseInputWithAdornment;
