import React from 'react';
import T from 'prop-types';

import {
  Rep,
  StyledFlatIconButton,
  StyledUpvote,
  UpvoteContainer,
} from './styledComponents';

const UpvotePanel = ({
  dispatchOpenModal,
  handleUpvote,
  isIssueDetail,
  isSignedIn,
  issueId,
  rep,
  upvoted,
  userId,
}) => (
  <UpvoteContainer isIssueDetail={isIssueDetail}>
    <StyledFlatIconButton
      Icon={<StyledUpvote upvoted={upvoted} />}
      onClick={() => {
        if (!isSignedIn) {
          return dispatchOpenModal({ modalState: 'signIn' });
        }
        return handleUpvote({ issueId, upvote: !upvoted, userId });
      }}
    />
    <Rep>{rep}</Rep>
  </UpvoteContainer>
);

UpvotePanel.propTypes = {
  dispatchOpenModal: T.func,
  handleUpvote: T.func,
  isIssueDetail: T.bool,
  isSignedIn: T.bool,
  issueId: T.string,
  rep: T.number,
  upvoted: T.bool,
  userId: T.string,
};

export default UpvotePanel;
