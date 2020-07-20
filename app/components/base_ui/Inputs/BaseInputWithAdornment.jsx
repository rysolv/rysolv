import React from 'react';
import T from 'prop-types';

import BaseInput from './BaseInput';
import { StyledFlatIcon, StyledFlatIconButton } from './styledComponents';

const BaseInputWithAdornment = ({
  adornmentComponent,
  disabled,
  onClick,
  position,
  renderIcon,
  ...restProps
}) => {
  const adornmentButton = {
    [`${position}Adornment`]: (
      <StyledFlatIconButton
        disabled={disabled}
        Icon={adornmentComponent}
        onClick={onClick}
      >
        {adornmentComponent}
      </StyledFlatIconButton>
    ),
  };
  const adornmentIcon = {
    [`${position}Adornment`]: (
      <StyledFlatIcon>{adornmentComponent}</StyledFlatIcon>
    ),
  };
  const adornmentToRender = !renderIcon ? adornmentButton : adornmentIcon;
  return <BaseInput {...adornmentToRender} {...restProps} />;
};

BaseInputWithAdornment.defaultProps = { position: 'start', renderIcon: false };

BaseInputWithAdornment.propTypes = {
  adornmentComponent: T.node,
  disabled: T.bool,
  onClick: T.func,
  position: T.oneOf(['end', 'start']),
  renderIcon: T.bool,
};

export default BaseInputWithAdornment;
