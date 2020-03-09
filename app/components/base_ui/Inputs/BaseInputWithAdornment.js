import React from 'react';
import T from 'prop-types';

import BaseInput from './BaseInput';
import { StyledFlatIconButton } from './styledComponents';

const BaseInputWithAdornment = ({
  adornmentComponent,
  onClick,
  position,
  ...restProps
}) => {
  const adornment = {
    [`${position}Adornment`]: (
      <StyledFlatIconButton Icon={adornmentComponent} onClick={onClick}>
        {adornmentComponent}
      </StyledFlatIconButton>
    ),
  };
  return <BaseInput {...adornment} {...restProps} />;
};

BaseInputWithAdornment.defaultProps = { position: 'start' };

BaseInputWithAdornment.propTypes = {
  adornmentComponent: T.node.isRequired,
  onClick: T.func,
  position: T.oneOf(['end', 'start']),
};

export default BaseInputWithAdornment;
