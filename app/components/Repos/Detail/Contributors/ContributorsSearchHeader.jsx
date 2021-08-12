import React, { useEffect } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { BaseInputWrapper } from '../styledComponents';
import { ContributorsSearchHeaderContainer } from './styledComponents';

const SearchIcon = iconDictionary('search');

const ContributorsSearchHeader = ({ handleInputChange }) => {
  useEffect(
    () => () => {
      handleInputChange({
        field: 'contributorInput',
        form: 'search',
        value: '',
      });
    },
    [],
  );

  return (
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
};

ContributorsSearchHeader.propTypes = {
  handleInputChange: T.func,
};

export default ContributorsSearchHeader;
