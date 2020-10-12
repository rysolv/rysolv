/* eslint-disable no-use-before-define */
import React from 'react';
import T from 'prop-types';

import { MainTextInput } from '../Inputs';
import { StyledAutocomplete, StyledChip } from './styledComponents';

const BaseAutocomplete = ({
  error,
  helperText,
  label,
  multiple,
  onChange,
  options,
  value,
  ...restProps
}) => (
  <StyledAutocomplete
    classes={{ focused: 'focused', inputRoot: 'inputRoot' }}
    getOptionLabel={option => option.value}
    getOptionSelected={(option1, option2) => option1.value === option2.value}
    multiple={multiple}
    onChange={onChange}
    options={options}
    renderInput={params => (
      <MainTextInput
        error={error}
        helperText={helperText}
        label={label}
        {...params}
      />
    )}
    renderTags={(item, getTagProps) =>
      item.map((option, index) => (
        <StyledChip label={option.value} {...getTagProps({ index })} />
      ))
    }
    value={value}
    {...restProps}
  />
);

BaseAutocomplete.defaultProps = { multiple: true };

BaseAutocomplete.propTypes = {
  error: T.bool,
  helperText: T.string,
  label: T.string,
  multiple: T.bool,
  onChange: T.func.isRequired,
  options: T.array,
  value: T.oneOfType([T.array, T.object]),
};

export default BaseAutocomplete;
