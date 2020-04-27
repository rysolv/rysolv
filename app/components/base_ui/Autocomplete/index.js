/* eslint-disable no-use-before-define */
import React from 'react';
import T from 'prop-types';
import Chip from '@material-ui/core/Chip';

import { MainTextInput } from '../Inputs';
import { StyledAutocomplete } from './styledComponents';

const BaseAutocomplete = ({ error, helperText, label, onChange, options }) => (
  <StyledAutocomplete
    classes={{ focused: 'focused', inputRoot: 'inputRoot' }}
    getOptionLabel={option => option.value}
    multiple
    onChange={onChange}
    options={options}
    endAdornment
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
        <Chip
          label={option.value}
          {...getTagProps({ index })}
          disabled={index === 0}
        />
      ))
    }
    style={{ width: 500 }}
  />
);

BaseAutocomplete.propTypes = {
  error: T.bool,
  helperText: T.string,
  label: T.string,
  onChange: T.func.isRequired,
  options: T.array,
};

export default BaseAutocomplete;
