import React from 'react';
import T from 'prop-types';

import {
  Rep,
  StyledCoin,
  StyledFlatIconButton,
  UpvoteContainer,
} from './styledComponents';

const UpvotePanel = ({
  disabled,
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
      disableRipple
      Icon={<StyledCoin disabled={disabled} upvoted={upvoted} />}
      onClick={() => {
        if (!isSignedIn) {
          return dispatchOpenModal({ modalState: 'signIn' });
        }
        if (!disabled) {
          return handleUpvote({ issueId, upvote: !upvoted, userId });
        }
        return null;
      }}
    />
    <Rep>{rep}</Rep>
  </UpvoteContainer>
);

UpvotePanel.propTypes = {
  disabled: T.bool.isRequired,
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
