import React from 'react';
import T from 'prop-types';

import { StyledPrimaryButton, StyledTableCell } from './styledComponents';

const ConnectCell = ({
  dispatchOpenModal,
  handleNav,
  id,
  selectedPosition,
  threadId,
}) => {
  const ButtonText = threadId ? `View Messages` : `Connect`;

  const tableData = { positionId: selectedPosition, userId: id };

  const handleClick = () => {
    if (threadId) {
      handleNav(`/messages/${threadId}`);
    } else {
      dispatchOpenModal({ tableData });
    }
  };

  return (
    <StyledTableCell>
      <StyledPrimaryButton label={ButtonText} onClick={handleClick} />
    </StyledTableCell>
  );
};

ConnectCell.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  handleNav: T.func.isRequired,
  selectedPosition: T.string.isRequired,
  threadId: T.string,
  id: T.string.isRequired,
};

export default ConnectCell;
