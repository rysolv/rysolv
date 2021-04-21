import React, { useState } from 'react';
import T from 'prop-types';

import {
  AcceptButton,
  ButtonGroup,
  DeleteUserContainer,
  StyledBodyMessage,
  StyledLink,
  StyledSecondaryButton,
  StyledTitle,
} from './styledComponents';

import BountySlider from './BountySlider';

const AcceptBountyModal = ({
  bounty,
  dispatchAcceptBounty,
  fundingId,
  handleClose,
  repoName,
  username,
}) => {
  const [userRatio, setUserRatio] = useState(0.9);
  const max = bounty * 10;

  const setPayout = e => {
    const percentage = e.target.value / max;
    if (percentage <= 0.9) {
      setUserRatio(percentage);
    } else {
      setUserRatio(0.9);
    }
  };

  const handleAccept = () => {
    dispatchAcceptBounty({ fundingId, userRatio });
    handleClose();
  };

  return (
    <DeleteUserContainer>
      <StyledTitle>You earned a bounty!</StyledTitle>
      <BountySlider
        bounty={bounty}
        max={max}
        repoName={repoName}
        setPayout={setPayout}
        username={username}
        userRatio={userRatio}
      />
      <StyledBodyMessage>
        A minimum of 10% of all bounties is contributed to the project
        maintainers. For more information, see
        <StyledLink to="/how-to#bounties"> how are bounties paid.</StyledLink>
      </StyledBodyMessage>
      <ButtonGroup>
        <StyledSecondaryButton label="Cancel" onClick={handleClose} />
        <AcceptButton label="Accept Bounty" onClick={handleAccept} />
      </ButtonGroup>
    </DeleteUserContainer>
  );
};

AcceptBountyModal.propTypes = {
  bounty: T.number.isRequired,
  dispatchAcceptBounty: T.func.isRequired,
  fundingId: T.string.isRequired,
  handleClose: T.func.isRequired,
  repoName: T.string.isRequired,
  username: T.string.isRequired,
};

export default AcceptBountyModal;
