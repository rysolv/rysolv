import styled from 'styled-components';

import { darkBlueColor } from 'defaultStyleHelper';

export const Battery = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

export const BatteryWrapper = styled.div``;
export const BatteryLabel = styled.div`
  text-align: end;
`;

export const Cell = styled.div`
  background: ${({ grey }) => (grey ? '#d7d7d7' : darkBlueColor)};
  height: 1rem;
  margin: 0 0.1rem;
  width: 3rem;
`;

export const SkillCard = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
