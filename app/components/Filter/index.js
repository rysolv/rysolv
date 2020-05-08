import React from 'react';
import T from 'prop-types';

import {
  BaseAutocomplete,
  BaseSlider,
  CheckboxWithLabel,
} from 'components/base_ui';

import { FilterContainer, StyledLabel, StyledTitle } from './styledComponents';

const statusOptions = ['Closed', 'Funded', 'Unfunded'];
const typeOptions = ['Bug', 'Feature'];

const Filter = ({
  filterValues: { langauge, organization, price, status, type },
  handleChangeFilter,
  languageOptions,
  organizationOptions,
}) => (
  <FilterContainer>
    <StyledTitle>Filters</StyledTitle>
    <StyledLabel>Language</StyledLabel>
    <BaseAutocomplete
      label={langauge}
      onChange={e =>
        handleChangeFilter({ field: 'language', value: e.target.value })
      }
      options={languageOptions}
    />
    <StyledLabel>Organization</StyledLabel>
    <BaseAutocomplete
      label={organization}
      onChange={e =>
        handleChangeFilter({ field: 'organization', value: e.target.value })
      }
      options={organizationOptions}
    />
    <StyledLabel>Price Range</StyledLabel>
    <BaseSlider
      onChange={e =>
        handleChangeFilter({ field: 'price', value: e.target.value })
      }
      value={price}
    />
    <StyledLabel>Status</StyledLabel>
    {statusOptions.map(value => (
      <CheckboxWithLabel
        checked={status[value]}
        label={value}
        onChange={e =>
          handleChangeFilter({ field: 'status', value: e.target.value })
        }
      />
    ))}
    <StyledLabel>Type</StyledLabel>
    {typeOptions.map(value => (
      <CheckboxWithLabel
        checked={type[value]}
        label={value}
        onChange={e =>
          handleChangeFilter({ field: 'status', value: e.target.value })
        }
      />
    ))}
  </FilterContainer>
);

Filter.propTypes = {
  filterValues: T.object,
  handleChangeFilter: T.func,
  languageOptions: T.array,
  organizationOptions: T.array,
};

export default Filter;
