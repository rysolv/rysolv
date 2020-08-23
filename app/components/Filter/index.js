import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import {
  BaseAutocomplete,
  BaseSlider,
  CheckboxWithLabel,
  ConditionalRender,
} from 'components/base_ui';

import {
  FilterContainer,
  OptionsWrapper,
  StyledBaseExpansionPanel,
  StyledLabel,
  StyledTitle,
} from './styledComponents';

const statusOptions = ['Closed', 'Funded', 'Unfunded'];
const typeOptions = ['Bug', 'Feature'];

const Filter = ({
  filterValues: { language, organization, price, status, type },
  handleChangeFilter,
  isMobile,
  languageOptions,
  organizationOptions,
}) => {
  const [open, setOpen] = useState(false);
  const FilterOptionsComponent = () => (
    <OptionsWrapper>
      {language && (
        <Fragment>
          <StyledLabel>Language</StyledLabel>
          <BaseAutocomplete
            onChange={(e, value) =>
              handleChangeFilter({ field: 'language', value })
            }
            options={languageOptions}
            value={language}
          />
        </Fragment>
      )}
      {organization && (
        <Fragment>
          <StyledLabel>Organization</StyledLabel>
          <BaseAutocomplete
            onChange={(e, value) =>
              handleChangeFilter({ field: 'organization', value })
            }
            options={organizationOptions}
            value={organization}
          />
        </Fragment>
      )}
      {price && (
        <Fragment>
          <StyledLabel>Price Range</StyledLabel>
          <BaseSlider
            max={5000}
            min={0}
            onChange={(e, value) =>
              handleChangeFilter({ field: 'price', value })
            }
            value={price}
          />
        </Fragment>
      )}
      {status && (
        <Fragment>
          <StyledLabel>Status</StyledLabel>
          {statusOptions.map(value => (
            <CheckboxWithLabel
              key={`checkbox-${value}`}
              checked={status[value.toLowerCase()]}
              label={value}
              onChange={() => handleChangeFilter({ field: 'status', value })}
            />
          ))}
        </Fragment>
      )}
      {type && (
        <Fragment>
          <StyledLabel>Type</StyledLabel>
          {typeOptions.map(value => (
            <CheckboxWithLabel
              key={`checkbox-${value}`}
              checked={type[value.toLowerCase()]}
              label={value}
              onChange={() => handleChangeFilter({ field: 'type', value })}
            />
          ))}
        </Fragment>
      )}
    </OptionsWrapper>
  );

  const DesktopView = () => (
    <Fragment>
      <StyledTitle>Filters</StyledTitle>
      <FilterOptionsComponent />
    </Fragment>
  );

  const MobileView = () => (
    <StyledBaseExpansionPanel
      Component={FilterOptionsComponent}
      handleLabelClick={() => setOpen(!open)}
      open={open}
      title={<StyledTitle>Filters</StyledTitle>}
    />
  );

  return (
    <FilterContainer>
      <ConditionalRender
        Component={DesktopView}
        FallbackComponent={MobileView}
        shouldRender={!isMobile}
      />
    </FilterContainer>
  );
};

Filter.propTypes = {
  filterValues: T.object.isRequired,
  handleChangeFilter: T.func.isRequired,
  isMobile: T.bool.isRequired,
  languageOptions: T.array,
  organizationOptions: T.array,
};

export default Filter;
