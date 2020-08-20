import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import {
  BackNav,
  BaseInputWithAdornment,
  ConditionalRender,
} from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyOverviewListComponent,
  OverviewListComponent,
} from '../OverviewList';
import {
  BaseInputWrapper,
  HeaderWrapper,
  SearchContainer,
  StyledBaseDropDownMenu,
  StyledH3,
} from '../styledComponents';

const SearchIcon = iconDictionary('search');

const UserWatching = ({
  handleNav,
  handleRemoveWatching,
  userId,
  watching,
}) => {
  const [selectedValue, setSelectedValue] = useState('Newest');
  const [searchValue, setSearchValue] = useState('');
  const filterWatching = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const sortedArray = watching.sort((a, b) => {
      if (selectedValue === 'Newest') {
        if (a.modifiedDate < b.modifiedDate) {
          return 1;
        }
        return -1;
      }
      if (selectedValue === 'Most Funded') {
        if (a.fundedAmount < b.fundedAmount) {
          return 1;
        }
        return -1;
      }
    });
    const filteredArray = sortedArray.filter(({ name }) => {
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredArray;
  };
  const filteredWatching = filterWatching();
  return (
    <Fragment>
      <BackNav
        label="Back to Overview"
        handleNav={handleNav}
        path="/settings"
      />
      <HeaderWrapper>
        <StyledH3>All Watching</StyledH3>
      </HeaderWrapper>
      <SearchContainer>
        <BaseInputWrapper hasMargin={false}>
          <BaseInputWithAdornment
            adornmentComponent={SearchIcon}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Find an issue..."
            position="end"
            renderIcon
          />
        </BaseInputWrapper>
        <StyledBaseDropDownMenu
          handleChange={value => setSelectedValue(value)}
          selectedValue={selectedValue}
          values={['Newest', 'Most Funded']}
        />
      </SearchContainer>
      <ConditionalRender
        Component={OverviewListComponent}
        FallbackComponent={
          <EmptyOverviewListComponent handleNav={handleNav} type="watching" />
        }
        propsToPassDown={{
          handleNav,
          handleRemoveWatching,
          list: filteredWatching,
          type: 'watching',
          userId,
        }}
        shouldRender={!!filteredWatching.length}
      />
    </Fragment>
  );
};

UserWatching.propTypes = {
  handleNav: T.func.isRequired,
  handleRemoveWatching: T.func.isRequired,
  userId: T.string.isRequired,
  watching: T.array.isRequired,
};

export default UserWatching;
