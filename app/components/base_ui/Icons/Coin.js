import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledCoin } from './styledComponents';

const CoinIcon = iconDictionary('coin');

const Coin = ({ ...restProps }) => (
  <StyledCoin {...restProps}>{CoinIcon}</StyledCoin>
);

export default Coin;
