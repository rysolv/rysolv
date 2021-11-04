/* eslint-disable no-use-before-define */
import React from 'react';
import T from 'prop-types';
import Chip from '@material-ui/core/Chip';

import iconDictionary from 'utils/iconDictionary';

import { MainTextInput } from '../Inputs';
import { StyledAutocomplete, StyledOption } from './styledComponents';

const CloseIcon = iconDictionary('close');

const BaseAutocomplete = ({
  error,
  helperText,
  label,
  multiple,
  onChange,
  options,
  placeholder,
  value,
  ...restProps
}) => (
  <StyledAutocomplete
    classes={{
      focused: 'focused',
      inputRoot: 'inputRoot',
      noOptions: 'noOptions',
    }}
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
        placeholder={placeholder}
        {...params}
      />
    )}
    renderOption={option => <StyledOption>{option.value}</StyledOption>}
    renderTags={(item, getTagProps) =>
      item.map((option, index) => (
        <Chip
          classes={{ root: 'tag' }}
          deleteIcon={CloseIcon}
          label={option.value}
          {...getTagProps({ index })}
        />
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
  placeholder: T.string,
  value: T.oneOfType([T.array, T.object]),
};

export default BaseAutocomplete;
