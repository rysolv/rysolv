import React from 'react';
import T from 'prop-types';
import { MonocleIcon } from '../Icons';

import {
  StyledWatchButton,
  WatchButtonContainer,
  ValueWrapper,
  LabelWrapper,
} from './styledComponents';

const WatchButton = ({ label, value, handleWatch, disabled }) => (
  <WatchButtonContainer>
    <StyledWatchButton disabled={disabled} onClick={handleWatch}>
      <MonocleIcon /> <LabelWrapper>{label}</LabelWrapper>
    </StyledWatchButton>
    <ValueWrapper>{value}</ValueWrapper>
  </WatchButtonContainer>
);

WatchButton.propTypes = {
  disabled: T.bool,
  handleWatch: T.func,
  label: T.string,
  value: T.number,
};

export default WatchButton;
