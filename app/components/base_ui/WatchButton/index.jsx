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
  dispatchFetchWatchList,
  handleWatch,
  label,
  value,
  watching,
}) => (
  <WatchButtonContainer>
    <StyledWatchButton disabled={disabled} onClick={handleWatch}>
      <MonocleIcon /> <LabelWrapper>{label}</LabelWrapper>
    </StyledWatchButton>
    <ValueWrapper
      onClick={() =>
        dispatchFetchWatchList({
          idArray: watching,
          modalState: 'issueWatchList',
        })
      }
    >
      {value}
    </ValueWrapper>
  </WatchButtonContainer>
);

WatchButton.propTypes = {
  disabled: T.bool,
  dispatchFetchWatchList: T.func,
  handleWatch: T.func,
  label: T.string,
  value: T.number,
  watching: T.array,
};

export default WatchButton;
