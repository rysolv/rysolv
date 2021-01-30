import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment, ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import IssuesComponent from './IssuesComponent';
import EmptyComponent from './EmptyComponent';
import {
  BaseInputWrapper,
  HeaderWrapper,
  SearchContainer,
  StyledBaseDropDownMenu,
  StyledH3,
} from '../styledComponents';

const SearchIcon = iconDictionary('search');

const UserIssues = ({ handleNav, issues }) => {
  const [selectedValue, setSelectedValue] = useState('Newest');
  const [searchValue, setSearchValue] = useState('');

  const filterIssues = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const sortedArray = [...issues].sort((a, b) => {
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
    const filteredArray = [...sortedArray].filter(({ name }) => {
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredArray;
  };
  const filteredIssues = filterIssues();

  return (
    <Fragment>
      <HeaderWrapper>
        <StyledH3>Your Issues</StyledH3>
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
        Component={IssuesComponent}
        FallbackComponent={EmptyComponent}
        propsToPassDown={{ handleNav, issues: filteredIssues }}
        shouldRender={!!filteredIssues.length}
      />
    </Fragment>
  );
};

UserIssues.propTypes = {
  handleNav: T.func,
  issues: T.array,
};

export default UserIssues;
