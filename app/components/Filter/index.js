import React from 'react';
import T from 'prop-types';

import {
  BaseAutocomplete,
  BaseSlider,
  CheckboxWithLabel,
} from 'components/base_ui';

import { FilterContainer, StyledLabel, StyledTitle } from './styledComponents';

const Filter = ({ languageOptions, ownerOptions = [] }) => (
  <FilterContainer>
    <StyledTitle>Filters</StyledTitle>
    <StyledLabel>Language</StyledLabel>
    <BaseAutocomplete onChange={() => {}} options={languageOptions} />
    <StyledLabel>Organization</StyledLabel>
    <BaseAutocomplete onChange={() => {}} options={ownerOptions} />
    <StyledLabel>Price Range</StyledLabel>
    <BaseSlider />
    <StyledLabel>Status</StyledLabel>
    <CheckboxWithLabel />
    <StyledLabel>Type</StyledLabel>
    <CheckboxWithLabel />
  </FilterContainer>
);

Filter.propTypes = {
  languageOptions: T.array,
  ownerOptions: T.array,
};

export default Filter;
