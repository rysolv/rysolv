import React from 'react';
import T from 'prop-types';

import { Upvote } from 'components/base_ui';

import { StyledFlatIconButton, UpvoteContainer } from './styledComponents';

const UpvotePanel = ({
  dispatchOpenModal,
  handleUpvote,
  isSignedIn,
  issueId,
  rep,
  upvoted,
  userId,
}) => (
  <UpvoteContainer upvoted={upvoted}>
    <StyledFlatIconButton
      Icon={<Upvote />}
      onClick={() => {
        if (!isSignedIn) {
          return dispatchOpenModal({ modalState: 'signIn' });
        }
        return handleUpvote({ issueId, userId });
      }}
    />
    {rep}
  </UpvoteContainer>
);

UpvotePanel.propTypes = {
  dispatchOpenModal: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  rep: T.number,
  upvoted: T.bool,
  userId: T.string,
};

export default UpvotePanel;
