import React, { useEffect } from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  BaseInputWrapper,
  IssuesSearchHeaderContainer,
  StyledBaseDropDownMenu,
} from '../styledComponents';

const SearchIcon = iconDictionary('search');

const IssuesSearchHeader = ({ handleInputChange, issuesFilter }) => {
  useEffect(() => {
    handleInputChange({
      field: 'issueInput',
      form: 'search',
      value: '',
    });
  }, []);

  return (
    <IssuesSearchHeaderContainer>
      <BaseInputWrapper hasMargin={false}>
        <BaseInputWithAdornment
          adornmentComponent={SearchIcon}
          onChange={e =>
            handleInputChange({
              field: 'issueInput',
              form: 'search',
              value: e.target.value,
            })
          }
          placeholder="Find an issue..."
          position="end"
          renderIcon
        />
      </BaseInputWrapper>
      <StyledBaseDropDownMenu
        handleChange={value =>
          handleInputChange({ field: 'issues', form: 'filter', value })
        }
        selectedValue={issuesFilter}
        values={['Newest', 'Most Funded']}
      />
    </IssuesSearchHeaderContainer>
  );
};

IssuesSearchHeader.propTypes = {
  handleInputChange: T.func,
  issuesFilter: T.string.isRequired,
};

export default IssuesSearchHeader;
