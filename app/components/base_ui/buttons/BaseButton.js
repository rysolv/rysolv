import React from 'react';
import T from 'prop-types';
import StyledButton from './styledComponents';

const BaseButton = ({ label, onClick, ...restProps }) => (
  <StyledButton classes={{ label: 'label' }} onClick={onClick} {...restProps}>
    {label}
  </StyledButton>
);

BaseButton.propTypes = {
  label: T.string,
  onClick: T.func,
};

export default BaseButton;
