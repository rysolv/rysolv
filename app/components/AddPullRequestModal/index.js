import React from 'react';
import T from 'prop-types';

import { IconButton } from 'components/base_ui';
import AddPullRequest from 'containers/PullRequests/Add';
import iconDictionary from 'utils/iconDictionary';

import { IconWrapper, AddPullRequesContainer } from './styledComponents';

const closeIcon = iconDictionary('close');

const AddPullRequestModal = ({ handleClose, issueId }) => (
  <AddPullRequesContainer>
    <IconWrapper>
      <IconButton icon={closeIcon} label="Close" onClick={handleClose} />
    </IconWrapper>
    <AddPullRequest handleClose={handleClose} issueId={issueId} />
  </AddPullRequesContainer>
);

AddPullRequestModal.propTypes = {
  handleClose: T.func.isRequired,
  issueId: T.string.isRequired,
};

export default AddPullRequestModal;
