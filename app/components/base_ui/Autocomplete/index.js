/* eslint-disable no-use-before-define */
import React from 'react';
import T from 'prop-types';

import { MainTextInput } from '../Inputs';
import { StyledAutocomplete, StyledChip } from './styledComponents';

const BaseAutocomplete = ({
  error,
  helperText,
  label,
  onChange,
  options,
  value,
  ...restProps
}) => (
  <StyledAutocomplete
    classes={{ focused: 'focused', inputRoot: 'inputRoot' }}
    multiple
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
        <StyledChip label={option} {...getTagProps({ index })} />
      ))
    }
    value={value}
    {...restProps}
  />
);

BaseAutocomplete.propTypes = {
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func.isRequired,
  options: T.array,
  value: T.array,
};

export default BaseAutocomplete;
