import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment, ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import EmptyComponent from './EmptyComponent';
import OrganizationsComponent from './OrganizationsComponent';
import {
  BaseInputWrapper,
  OrganizationsSearchContainer,
  StyledBaseDropDownMenu,
} from './styledComponents';
import { HeaderWrapper, StyledH3 } from '../styledComponents';

const SearchIcon = iconDictionary('search');

const UserOrganizations = ({ handleNav, organizations }) => {
  const [selectedValue, setSelectedValue] = useState('Newest');
  const [searchValue, setSearchValue] = useState('');

  const filterOrganizations = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const sortedArray = organizations.sort((a, b) => {
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
    const filteredArray = sortedArray.filter(({ name }) => {
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredArray;
  };
  const filteredOrganizations = filterOrganizations();
  return (
    <Fragment>
      <HeaderWrapper>
        <StyledH3>Your Organizations</StyledH3>
      </HeaderWrapper>
      <OrganizationsSearchContainer>
        <BaseInputWrapper hasMargin={false}>
          <BaseInputWithAdornment
            adornmentComponent={SearchIcon}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Find an organization..."
            position="end"
            renderIcon
          />
        </BaseInputWrapper>
        <StyledBaseDropDownMenu
          handleChange={value => setSelectedValue(value)}
          selectedValue={selectedValue}
          values={['Newest', 'Most Funded']}
        />
      </OrganizationsSearchContainer>
      <ConditionalRender
        Component={OrganizationsComponent}
        FallbackComponent={EmptyComponent}
        propsToPassDown={{
          handleNav,
          organizations: filteredOrganizations,
          selectedValue,
          setSearchValue,
          setSelectedValue,
        }}
        shouldRender={!!filteredOrganizations.length}
      />
    </Fragment>
  );
};

UserOrganizations.propTypes = {
  handleNav: T.func,
  organizations: T.array,
};

export default UserOrganizations;
