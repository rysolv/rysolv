import React from 'react';
import T from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StyledCheckbox from './styledComponents';

const BaseCheckbox = ({
  checked,
  className,
  disabled,
  formControlProps,
  label,
  onChange,
  ...restProps
}) => (
  <StyledCheckbox className={className}>
    <FormControlLabel
      classes={{ label: 'label', root: 'formControl' }}
      control={
        <Checkbox
          checked={checked}
          classes={{ checked: 'checked', root: 'checkbox' }}
          disabled={disabled}
          onChange={onChange}
          {...restProps}
        />
      }
      label={label}
      {...formControlProps}
    />
  </StyledCheckbox>
);

BaseCheckbox.propTypes = {
  checked: T.bool,
  className: T.string,
  disabled: T.bool,
  formControlProps: T.object,
  label: T.string,
  onChange: T.func,
};

export default BaseCheckbox;
