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

const Filter = ({
  filterOptions: {
    bugTag,
    closedIssues,
    featureTag,
    fundedIssues,
    issueLanguages,
    maxBounty,
    organizations,
    unfundedIssues,
    userLanguages,
  },
  filterValues: { language, organization, price, status, type },
  handleChangeFilter,
  isMobile,
  view,
}) => {
  const [open, setOpen] = useState(false);

  const statusOptions = [
    { name: 'Closed', count: closedIssues },
    { name: 'Funded', count: fundedIssues },
    { name: 'Unfunded', count: unfundedIssues },
  ];
  const typeOptions = [
    { name: 'Bug', count: bugTag },
    { name: 'Feature', count: featureTag },
  ];

  const FilterOptionsComponent = () => (
    <OptionsWrapper>
      {language && (
        <Fragment>
          <StyledLabel>Language</StyledLabel>
          <BaseAutocomplete
            onChange={(e, value) =>
              handleChangeFilter({ field: 'language', value })
            }
            options={view === 'users' ? userLanguages : issueLanguages}
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
            options={organizations}
            value={organization}
          />
        </Fragment>
      )}
      {price && (
        <Fragment>
          <StyledLabel>Price Range</StyledLabel>
          <BaseSlider
            max={maxBounty}
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
          {statusOptions.map(el => (
            <CheckboxWithLabel
              checked={status[el.name.toLowerCase()]}
              count={el.count}
              key={`checkbox-${el.name}`}
              label={el.name}
              onChange={() =>
                handleChangeFilter({ field: 'status', value: el.name })
              }
            />
          ))}
        </Fragment>
      )}
      {type && (
        <Fragment>
          <StyledLabel>Type</StyledLabel>
          {typeOptions.map(el => (
            <CheckboxWithLabel
              checked={type[el.name.toLowerCase()]}
              count={el.count}
              key={`checkbox-${el.name}`}
              label={el.name}
              onChange={() =>
                handleChangeFilter({ field: 'type', value: el.name })
              }
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
  filterOptions: T.object,
  filterValues: T.object.isRequired,
  handleChangeFilter: T.func.isRequired,
  isMobile: T.bool.isRequired,
  view: T.string.isRequired,
};

export default Filter;
