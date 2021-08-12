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
    maxRepoFunded,
    repoLanguages,
    repos,
    unfundedIssues,
    userLanguages,
  },
  filterValues: { language, price, repo, status, type },
  handleChangeFilter,
  isMobile,
  view,
}) => {
  const [open, setOpen] = useState(false);

  const statusOptions = [
    { count: closedIssues, name: 'Closed' },
    { count: fundedIssues, name: 'Funded' },
    { count: unfundedIssues, name: 'Unfunded' },
  ];
  const typeOptions = [
    { count: bugTag, name: 'Bug' },
    { count: featureTag, name: 'Feature' },
  ];

  const options = {};
  switch (view) {
    case 'users':
      options.languages = userLanguages;
      break;
    case 'issues':
      options.languages = issueLanguages;
      options.max = maxBounty;
      break;
    case 'repos':
      options.languages = repoLanguages;
      options.max = maxRepoFunded;
      break;
    default:
      break;
  }

  const FilterOptionsComponent = () => (
    <OptionsWrapper>
      {language && (
        <Fragment>
          <StyledLabel>Language</StyledLabel>
          <BaseAutocomplete
            onChange={(e, value) =>
              handleChangeFilter({ field: 'language', value })
            }
            options={options.languages}
            value={language}
          />
        </Fragment>
      )}
      {repo && (
        <Fragment>
          <StyledLabel>Repo</StyledLabel>
          <BaseAutocomplete
            onChange={(e, value) =>
              handleChangeFilter({ field: 'repo', value })
            }
            options={repos}
            value={repo}
          />
        </Fragment>
      )}
      {price && (
        <Fragment>
          <StyledLabel>Price Range</StyledLabel>
          <BaseSlider
            max={options.max}
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
  filterOptions: T.object.isRequired,
  filterValues: T.object.isRequired,
  handleChangeFilter: T.func.isRequired,
  isMobile: T.bool.isRequired,
  view: T.string.isRequired,
};

export default Filter;
