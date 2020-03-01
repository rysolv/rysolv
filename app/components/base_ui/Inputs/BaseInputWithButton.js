import React from 'react';
import T from 'prop-types';
import { FlatIconButton } from '../Buttons';
import BaseInput from './BaseInput';

const BaseInputWithButton = ({
  adornmentComponent,
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
  return <BaseInput {...adornment} {...restProps} />;
};

BaseInputWithButton.defaultProps = { position: 'start' };

BaseInputWithButton.propTypes = {
  adornmentComponent: T.node.isRequired,
  position: T.oneOf(['end', 'start']),
};

export default BaseInputWithButton;
