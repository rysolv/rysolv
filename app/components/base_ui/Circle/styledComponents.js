import styled from 'styled-components';

import { textColor } from 'defaultStyleHelper';

export const CircularChart = styled.svg`
  stroke: #ff9f00;
`;

export const InnerCircle = styled.path`
  animation: progress 1s ease-out forwards;
  fill: none;
  stroke-linecap: round;
  stroke-width: 2.8;
  stroke: #ff9f00;
`;

export const OuterCircle = styled.path`
  fill: none;
  stroke-width: 3.8;
  stroke: #f5f5f5;
`;

export const Percentage = styled.text`
  color: ${textColor};
  font-family: inherit;
  font-size: 1rem;
  stroke: none;
  text-anchor: middle;
`;

export const SingleChart = styled.div`
  height: 5rem;
  width: 5rem;
`;
