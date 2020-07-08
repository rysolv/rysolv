import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import EmptyCard from './EmptyCard';
import PullRequestsCard from './Card';
import {
  BaseInputWrapper,
  SearchContainer,
  StyledBaseDropDownMenu,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const PullRequests = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState('Newest');
  const [searchValue, setSearchValue] = useState('');
  const filterData = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const sortedArray = data.sort((a, b) => {
      if (selectedValue === 'Newest') {
        if (a.createdDate < b.createdDate) {
          return 1;
        }
        return -1;
      }
    });
    const filteredArray = sortedArray.filter(({ merged, open, title }) => {
      if (!title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }
      if (selectedValue === 'Merged' && !merged) {
        return false;
      }
      if (selectedValue === 'Open' && !open) {
        return false;
      }
      return true;
    });
    return filteredArray;
  };
  const filteredData = filterData();
  const hasPullRequests =
    filteredData.length > 0 && !filteredData.includes(null);
  const propsToPassDown = { data: filteredData };
  const viewToRender = hasPullRequests ? (
    <PullRequestsCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <SearchContainer>
        <BaseInputWrapper hasMargin={false}>
          <BaseInputWithAdornment
            adornmentComponent={SearchIcon}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Find a pull request..."
            position="end"
            renderIcon
          />
        </BaseInputWrapper>
        <StyledBaseDropDownMenu
          handleChange={value => setSelectedValue(value)}
          selectedValue={selectedValue}
          values={['Newest', 'Merged', 'Open']}
        />
      </SearchContainer>
      {viewToRender}
    </Fragment>
  );
};

PullRequests.propTypes = {
  data: T.array.isRequired,
};

export default PullRequests;
