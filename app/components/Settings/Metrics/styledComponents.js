import styled from 'styled-components';

import { defaultFontSize } from 'defaultStyleHelper';

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailListItem = styled.div`
  display: flex;
  flex-flow: wrap;
  font-size: ${defaultFontSize};
  padding: 0.5rem 0;
`;

export const DetailsPanel = styled.div`
  color: #6a737d;
  align-self: flex-end;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const DetailsPanelWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

export const Divider = styled.div`
  background: #00eb93;
  border-radius: 0.6rem;
  display: block;
  height: 0.4rem;
  width: 100%;
`;

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledUserBarTitle = styled.div`
  font-size: 1.8rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
`;

export const UserDetails = styled.div`
  padding: 0.5rem;
`;

export const UserMetricsContainer = styled.div`
  padding: 3rem 0;
`;
