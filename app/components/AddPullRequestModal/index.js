import React from 'react';
import T from 'prop-types';

import { IconButton } from 'components/base_ui';
import AddPullRequest from 'containers/PullRequests/Add';
import iconDictionary from 'utils/iconDictionary';

import { AddPullRequestContainer, IconWrapper } from './styledComponents';

const closeIcon = iconDictionary('close');

const AddPullRequestModal = ({ handleClose, issueId }) => (
  <AddPullRequestContainer>
    <IconWrapper>
      <IconButton icon={closeIcon} label="Close" onClick={handleClose} />
    </IconWrapper>
    <AddPullRequest handleClose={handleClose} issueId={issueId} />
  </AddPullRequestContainer>
);

AddPullRequestModal.propTypes = {
  handleClose: T.func.isRequired,
  issueId: T.string.isRequired,
};

export default AddPullRequestModal;
