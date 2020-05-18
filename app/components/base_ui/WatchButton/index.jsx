import React from 'react';
import T from 'prop-types';
import { MonocleIcon } from '../Icons';

import {
  StyledWatchButton,
  WatchButtonContainer,
  ValueWrapper,
  LabelWrapper,
} from './styledComponents';

const WatchButton = ({
  disabled,
  dispatchOpenModal,
  handleWatch,
  label,
  value,
}) => (
  <WatchButtonContainer>
    <StyledWatchButton disabled={disabled} onClick={handleWatch}>
      <MonocleIcon /> <LabelWrapper>{label}</LabelWrapper>
    </StyledWatchButton>
    <ValueWrapper
      onClick={() => dispatchOpenModal({ modalState: 'issueWatchList' })}
    >
      {value}
    </ValueWrapper>
  </WatchButtonContainer>
);

WatchButton.propTypes = {
  disabled: T.bool,
  dispatchOpenModal: T.func,
  handleWatch: T.func,
  label: T.string,
  value: T.number,
};

export default WatchButton;
