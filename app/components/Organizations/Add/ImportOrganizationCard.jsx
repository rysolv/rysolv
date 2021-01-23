import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AddContainer,
  IconContainer,
  ImportCardWrapper,
  StyledLinkContainer,
  StyledOrganizationBody,
  StyledOrganizationHeader,
  StyledOrganizationTitle,
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
        form: 'organizationData',
        value: organizationUrl,
      });
    }
  };

  return (
    <ImportCardWrapper>
      <StyledOrganizationBody>
        <StyledOrganizationHeader>
          {moment.utc(modifiedDate).fromNow()}
        </StyledOrganizationHeader>
        <StyledOrganizationTitle>
          <IconContainer>{GithubIcon}</IconContainer>
          <StyledLinkContainer>
            <a href={organizationUrl} target="_blank">
              {name}
            </a>
          </StyledLinkContainer>
        </StyledOrganizationTitle>
      </StyledOrganizationBody>
      <IconToolTip disabled={!exists} toolTipText="Already imported">
        <AddContainer disabled={exists} onClick={handleImport}>
          {AddBox}
        </AddContainer>
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
