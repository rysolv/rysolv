import styled from 'styled-components';
import { headerFontSize, textColor } from 'defaultStyleHelper';

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const ContentContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

export const FilterContainer = styled.div`
  width: 30%;
`;

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20%;
  width: 100%;
`;

export const OverviewHeader = styled.div`
  font-size: ${headerFontSize};
  width: 100%;
  display: flex;
  margin: 5rem 0 2rem 2rem;
  color: ${textColor};
`;
