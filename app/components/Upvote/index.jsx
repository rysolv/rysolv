import React from 'react';
import T from 'prop-types';
import { Upvote } from 'components/base_ui';
import { StyledFlatIconButton, UpvoteContainer } from './styledComponents';

const UpvotePanel = ({ upvoted, handleUpvote, issueId, userId, rep }) => (
  <UpvoteContainer upvoted={upvoted}>
    <StyledFlatIconButton
      Icon={<Upvote />}
      onClick={() => handleUpvote({ issueId, userId })}
    />
    {rep}
  </UpvoteContainer>
);

UpvotePanel.propTypes = {
  upvoted: T.bool,
  handleUpvote: T.func,
  issueId: T.string,
  userId: T.string,
  rep: T.number,
};

export default UpvotePanel;
