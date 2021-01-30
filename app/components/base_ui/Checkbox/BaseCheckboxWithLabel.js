import React from 'react';
import T from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import BaseCheckbox from './BaseCheckbox';
import { CheckboxWrapper, StyledCount } from './styledComponents';

const CheckboxWithLabel = ({
  checked,
  count,
  disabled,
  formControlProps,
  label,
  onChange,
  ...restProps
}) => (
  <CheckboxWrapper>
    <FormControlLabel
      classes={{ label: 'label', root: 'formControl' }}
      control={
        <BaseCheckbox
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...restProps}
        />
      }
      label={label}
      {...formControlProps}
      {...restProps}
    />
    {count > 0 && <StyledCount>{count}</StyledCount>}
  </CheckboxWrapper>
);

CheckboxWithLabel.propTypes = {
  checked: T.bool.isRequired,
  count: T.number,
  disabled: T.bool,
  formControlProps: T.object,
  label: T.string.isRequired,
  onChange: T.func.isRequired,
};

export default CheckboxWithLabel;
