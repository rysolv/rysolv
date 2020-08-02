import React from 'react';
import T from 'prop-types';

import BaseTextInput from './BaseTextInput';
import {
  StyledStripeFormControl,
  StyledStripeModalIcon,
} from './styledComponents';

const PaymentTextInput = ({
  adornmentComponent,
  error,
  fontSize,
  helperText,
  InputProps,
  onChange,
  value,
  ...restProps
}) => {
  const adornment = {
    [`startAdornment`]: (
      <StyledStripeModalIcon fontSize={fontSize} Icon={adornmentComponent}>
        {adornmentComponent}
      </StyledStripeModalIcon>
    ),
  };
  return (
    <StyledStripeFormControl>
      <BaseTextInput
        error={error}
        helperText={helperText}
        onChange={onChange}
        InputProps={{
          ...InputProps,
          ...adornment,
        }}
        variant="outlined"
        value={value}
        {...restProps}
      />
    </StyledStripeFormControl>
  );
};

PaymentTextInput.propTypes = {
  adornmentComponent: T.node,
  error: T.bool,
  fontSize: T.string,
  helperText: T.string,
  InputProps: T.object,
  onChange: T.func,
  value: T.oneOfType([T.number, T.string]),
};

export default PaymentTextInput;
