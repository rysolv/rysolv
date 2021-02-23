import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AddContainer,
  IconContainer,
  ImportCardWrapper,
  RepoNameWrapper,
  StyledIssueBody,
  StyledIssueContent,
  StyledIssueHeader,
  StyledIssueTitle,
  StyledLinkContainer,
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
      <StyledIssueBody>
        <StyledIssueHeader>
          <RepoNameWrapper>{repoName}</RepoNameWrapper>
          {moment.utc(createdDate).fromNow()}
        </StyledIssueHeader>
        <StyledIssueContent>
          <StyledIssueTitle>
            <IconContainer>{GithubIcon}</IconContainer>
            <StyledLinkContainer>
              <a href={repo} target="_blank">
                {name}
              </a>
            </StyledLinkContainer>
          </StyledIssueTitle>
          <IconToolTip disabled={!exists} toolTipText="Already imported">
            <AddContainer disabled={exists} onClick={handleImport}>
              {AddBox}
            </AddContainer>
          </IconToolTip>
        </StyledIssueContent>
      </StyledIssueBody>
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
