import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { StyledBaseInputWithAdornment } from './styledComponents';

const SearchIcon = iconDictionary('search');

const HeaderSearchBar = ({ handleChangeSearch }) => (
  <StyledBaseInputWithAdornment
    adornmentComponent={SearchIcon}
    onChange={e =>
      handleChangeSearch({
        field: 'overviewInput',
        value: e.target.value,
      })
    }
    placeholder="Search or jump to..."
    position="end"
    renderIcon
  />
);

HeaderSearchBar.propTypes = {
  handleChangeSearch: T.func,
};

export default HeaderSearchBar;
