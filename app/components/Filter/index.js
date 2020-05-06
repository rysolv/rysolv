import React from 'react';
import T from 'prop-types';

import {
  BaseAutocomplete,
  BaseSlider,
  CheckboxWithLabel,
} from 'components/base_ui';

import { FilterContainer, StyledLabel, StyledTitle } from './styledComponents';

const statusOptions = ['Closes', 'Funded', 'Unfunded'];
const typeOptions = ['Bug', 'Feature'];

const Filter = ({ handleFilterChange, languageOptions, ownerOptions = [] }) => (
  <FilterContainer>
    <StyledTitle>Filters</StyledTitle>
    <StyledLabel>Language</StyledLabel>
    <BaseAutocomplete
      onChange={() => handleFilterChange()}
      options={languageOptions}
    />
    <StyledLabel>Organization</StyledLabel>
    <BaseAutocomplete
      onChange={() => handleFilterChange()}
      options={ownerOptions}
    />
    <StyledLabel>Price Range</StyledLabel>
    <BaseSlider onChange={() => handleFilterChange()} />
    <StyledLabel>Status</StyledLabel>
    {statusOptions.map(value => (
      <CheckboxWithLabel
        checked={value}
        label={value}
        onChange={() => handleFilterChange()}
      />
    ))}
    <StyledLabel>Type</StyledLabel>
    {typeOptions.map(value => (
      <CheckboxWithLabel
        checked={value}
        label={value}
        onChange={() => handleFilterChange()}
      />
    ))}
  </FilterContainer>
);

Filter.propTypes = {
  handleFilterChange: T.func.isRequired,
  languageOptions: T.array.isRequired,
  ownerOptions: T.array.isRequired,
};

export default Filter;
