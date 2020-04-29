import React from 'react';
import T from 'prop-types';

import { StyledDropDownMenu, StyledMenuItem } from './styledComponents';

const BaseDropDownMenu = ({
  handleChange,
  selectedValue,
  values,
  ...props
}) => (
  <StyledDropDownMenu
    classes={{ select: 'select' }}
    disableUnderline
    onChange={e => handleChange(e.target.value)}
    value={selectedValue}
    {...props}
  >
    {values.map(value => (
      <StyledMenuItem key={`menu-item-${value}`} value={value}>
        {value}
      </StyledMenuItem>
    ))}
  </StyledDropDownMenu>
);

BaseDropDownMenu.propTypes = {
  handleChange: T.func.isRequired,
  selectedValue: T.string.isRequired,
  values: T.array.isRequired,
};

export default BaseDropDownMenu;
