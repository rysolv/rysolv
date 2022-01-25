import styled from 'styled-components';

import { darkBlueColor } from 'defaultStyleHelper';

export const Battery = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BatteryWrapper = styled.div``;
export const BatteryLabel = styled.div`
  text-align: end;
`;

export const Cell = styled.div`
  background: ${({ grey }) => (grey ? '#d7d7d7' : darkBlueColor)};
  height: 1rem;
  width: 3rem;
  margin: 0 0.1rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SkillCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 0 0 0.5rem 0;
`;
