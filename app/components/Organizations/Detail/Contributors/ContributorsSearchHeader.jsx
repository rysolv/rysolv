import React from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  BaseInputWrapper,
  ContributorsSearchHeaderContainer,
} from '../styledComponents';

const SearchIcon = iconDictionary('search');

const ContributorsSearchHeader = ({ handleInputChange }) => (
  <ContributorsSearchHeaderContainer>
    <BaseInputWrapper hasMargin>
      <BaseInputWithAdornment
        adornmentComponent={SearchIcon}
        onChange={e =>
          handleInputChange({
            field: 'contributorInput',
            form: 'search',
            value: e.target.value,
          })
        }
        placeholder="Find a contributor..."
        position="end"
        renderIcon
      />
    </BaseInputWrapper>
  </ContributorsSearchHeaderContainer>
);

ContributorsSearchHeader.propTypes = {
  handleInputChange: T.func,
};

export default ContributorsSearchHeader;
