import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AddIconWrapper,
  IconWrapper,
  ImportCardWrapper,
  RepoNameWrapper,
  StyledBody,
  StyledContent,
  StyledHeader,
  StyledLink,
  StyledTitle,
} from './styledComponents';

const AddBox = iconDictionary('addBox');
const GithubIcon = iconDictionary('github');

const ImportCard = ({
  createdDate,
  exists,
  handleInputChange,
  name,
  repo,
  repoName,
}) => {
  const handleImport = () => {
    if (!exists) {
      handleInputChange({
        field: 'autoImportUrl',
        form: 'issueData',
        value: repo,
      });
    }
  };

  return (
    <ImportCardWrapper>
      <StyledBody>
        <StyledHeader>
          <RepoNameWrapper>{repoName}</RepoNameWrapper>
          {moment.utc(createdDate).fromNow()}
        </StyledHeader>
        <StyledContent>
          <StyledTitle>
            <IconWrapper>{GithubIcon}</IconWrapper>
            <StyledLink>
              <a href={repo} target="_blank">
                {name}
              </a>
            </StyledLink>
          </StyledTitle>
          <IconToolTip disabled={!exists} toolTipText="Already imported">
            <AddIconWrapper disabled={exists} onClick={handleImport}>
              {AddBox}
            </AddIconWrapper>
          </IconToolTip>
        </StyledContent>
      </StyledBody>
    </ImportCardWrapper>
  );
};

ImportCard.propTypes = {
  createdDate: T.string.isRequired,
  exists: T.bool.isRequired,
  handleInputChange: T.func.isRequired,
  name: T.string.isRequired,
  repo: T.string.isRequired,
  repoName: T.string.isRequired,
};

export default ImportCard;
