import React from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  BaseInputWrapper,
  ContributorsSearchHeaderContainer,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const ContributorsSearchHeader = ({
  disabled,
  handleInputChange,
  handleSearch,
  search,
}) => {
  const { contributorInput } = { ...search };
  return (
    <ContributorsSearchHeaderContainer>
      <BaseInputWrapper>
        <BaseInputWithAdornment
          disabled={disabled}
          adornmentComponent={SearchIcon}
          onChange={e =>
            handleInputChange({
              field: 'contributorInput',
              form: 'search',
              value: e.target.value,
            })
          }
          onClick={() => handleSearch({ value: contributorInput.value })}
          placeholder="Find a contributor..."
          position="end"
        />
      </BaseInputWrapper>
    </ContributorsSearchHeaderContainer>
  );
};

ContributorsSearchHeader.defaultProps = { disabled: false };

ContributorsSearchHeader.propTypes = {
  disabled: T.bool,
  handleInputChange: T.func,
  handleSearch: T.func,
  search: T.object,
};

export default ContributorsSearchHeader;
