import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AddIconWrapper,
  IconWrapper,
  ImportCardWrapper,
  StyledBody,
  StyledHeader,
  StyledLink,
  StyledTitle,
} from './styledComponents';

const AddBox = iconDictionary('addBox');
const GithubIcon = iconDictionary('github');

const ImportCard = ({
  exists,
  handleInputChange,
  modifiedDate,
  name,
  organizationUrl,
}) => {
  const handleImport = () => {
    if (!exists) {
      handleInputChange({
        field: 'autoImportUrl',
        form: 'repoData',
        value: organizationUrl,
      });
    }
  };

  return (
    <ImportCardWrapper>
      <StyledBody>
        <StyledHeader>{moment.utc(modifiedDate).fromNow()}</StyledHeader>
        <StyledTitle>
          <IconWrapper>{GithubIcon}</IconWrapper>
          <StyledLink>
            <a href={organizationUrl} target="_blank">
              {name}
            </a>
          </StyledLink>
        </StyledTitle>
      </StyledBody>
      <IconToolTip disabled={!exists} toolTipText="Already imported">
        <AddIconWrapper disabled={exists} onClick={handleImport}>
          {AddBox}
        </AddIconWrapper>
      </IconToolTip>
    </ImportCardWrapper>
  );
};

ImportCard.propTypes = {
  exists: T.bool.isRequired,
  handleInputChange: T.func.isRequired,
  modifiedDate: T.string.isRequired,
  name: T.string.isRequired,
  organizationUrl: T.string.isRequired,
};

export default ImportCard;
