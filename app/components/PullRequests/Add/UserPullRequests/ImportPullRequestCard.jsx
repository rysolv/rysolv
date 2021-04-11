import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AddIconWrapper,
  IconWrapper,
  ImportCardWrapper,
  PullNumberWrapper,
  StyledBody,
  StyledHeader,
  StyledTitle,
} from './styledComponents';

const AddBox = iconDictionary('addBox');
const GithubIcon = iconDictionary('github');

const ImportPullRequestCard = ({
  exists,
  handleImport,
  handleInputChange,
  htmlUrl,
  modifiedDate,
  pullNumber,
  title,
}) => {
  const handleSubmitImport = () => {
    if (!exists) {
      handleInputChange({
        field: 'importUrl',
        form: 'importData',
        value: htmlUrl,
      });
      handleImport({ url: htmlUrl });
    }
  };

  return (
    <ImportCardWrapper>
      <StyledBody>
        <StyledHeader>{moment.utc(modifiedDate).fromNow()}</StyledHeader>
        <StyledTitle>
          <IconWrapper>{GithubIcon}</IconWrapper>
          <div>
            <a href={htmlUrl} target="_blank">
              {title} <PullNumberWrapper>#{pullNumber}</PullNumberWrapper>
            </a>
          </div>
        </StyledTitle>
      </StyledBody>
      <IconToolTip disabled={!exists} toolTipText="Already imported">
        <AddIconWrapper disabled={exists} onClick={handleSubmitImport}>
          {AddBox}
        </AddIconWrapper>
      </IconToolTip>
    </ImportCardWrapper>
  );
};

ImportPullRequestCard.propTypes = {
  exists: T.bool.isRequired,
  handleImport: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  htmlUrl: T.string.isRequired,
  modifiedDate: T.string.isRequired,
  pullNumber: T.number.isRequired,
  title: T.string.isRequired,
};

export default ImportPullRequestCard;
