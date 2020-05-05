import styled from 'styled-components';
import { defaultFontSize, headerFontSize, textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: ${defaultFontSize};
  margin: 1rem 0;
`;

export const CardTitle = styled.div`
  font-size: ${headerFontSize};
  margin: 4rem 0 0 2rem;
  color: ${textColor};
`;

export const FilterContainer = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
`;

export const IssueWrapper = styled.div`
  display: flex;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  height: 55rem;
  justify-content: center;
  margin: 0.5rem 1rem;
  text-align: center;
`;

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const SubHeaderWrapper = styled.div`
  display: flex;
  margin: 1rem 0 0 2rem;
`;
