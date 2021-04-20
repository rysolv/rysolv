import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment, ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import BountyComponent from './BountyComponent';
import EmptyComponent from './EmptyComponent';
import {
  BaseInputWrapper,
  HeaderWrapper,
  SearchContainer,
  StyledBaseDropDownMenu,
  StyledH3,
} from '../styledComponents';

const SearchIcon = iconDictionary('search');

const UserBounties = ({ bounties, dispatchAcceptBounty, handleNav }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('Newest');

  const filterBounties = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const sortedArray = [...bounties].sort((a, b) => {
      if (selectedValue === 'Newest') {
        if (a.createdDate < b.createdDate) {
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
  const filteredBounties = filterBounties();

  return (
    <Fragment>
      <HeaderWrapper>
        <StyledH3 removeMarginTop>Your Bounties</StyledH3>
      </HeaderWrapper>
      <SearchContainer>
        <BaseInputWrapper hasMargin={false}>
          <BaseInputWithAdornment
            adornmentComponent={SearchIcon}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Find a bounty..."
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
        Component={BountyComponent}
        FallbackComponent={EmptyComponent}
        propsToPassDown={{
          bounties: filteredBounties,
          dispatchAcceptBounty,
          handleNav,
        }}
        shouldRender={!!filteredBounties.length}
      />
    </Fragment>
  );
};

UserBounties.propTypes = {
  bounties: T.array.isRequired,
  dispatchAcceptBounty: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserBounties;
