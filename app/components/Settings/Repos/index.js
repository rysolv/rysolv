import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment, ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import EmptyComponent from './EmptyComponent';
import ReposComponent from './ReposComponent';
import {
  BaseInputWrapper,
  HeaderWrapper,
  SearchContainer,
  StyledBaseDropDownMenu,
  StyledH3,
} from '../styledComponents';

const SearchIcon = iconDictionary('search');

const UserRepos = ({ handleNav, repos }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('Newest');

  const filterRepos = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const sortedArray = [...repos].sort((a, b) => {
      if (selectedValue === 'Newest') {
        if (a.modifiedDate < b.modifiedDate) {
          return 1;
        }
        return -1;
      }
      if (selectedValue === 'Most Funded') {
        if (a.totalFunded < b.totalFunded) {
          return 1;
        }
        return -1;
      }
    });
    const filteredArray = [...sortedArray].filter(({ name }) => {
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredArray;
  };
  const filteredRepos = filterRepos();
  return (
    <Fragment>
      <HeaderWrapper>
        <StyledH3>Your Repos</StyledH3>
      </HeaderWrapper>
      <SearchContainer>
        <BaseInputWrapper hasMargin={false}>
          <BaseInputWithAdornment
            adornmentComponent={SearchIcon}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Find a repo..."
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
        Component={ReposComponent}
        FallbackComponent={EmptyComponent}
        propsToPassDown={{
          handleNav,
          repos: filteredRepos,
        }}
        shouldRender={!!filteredRepos.length}
      />
    </Fragment>
  );
};

UserRepos.propTypes = {
  handleNav: T.func,
  repos: T.array,
};

export default UserRepos;
