import styled from 'styled-components';

import { whiteColor, blueColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop, mobile } = mediaQueriesByDevice;

export const CardContainer = styled.div`
  background: ${whiteColor};
  border-radius: 0.7rem;
  margin: 5rem 0 0;
  min-height: 50rem;
  padding: 7.5rem 10%;

  ${laptop} {
    padding: 4rem 3.2rem;
  }

  ${mobile} {
    padding: 2rem;
  }

  @media (max-width: 370px) {
    margin: 0;
  }
`;

export const CodeRankingContainer = styled.div`
  margin: 0 12rem;
  max-width: 120rem;

  ${laptop} {
    margin: 0 3rem;
  }
`;

export const CodeRankingHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: capitalize;

  @media (max-width: 500px) {
    font-size: 2.8rem;
    line-height: 2.931rem;
  }

  @media (max-width: 370px) {
    font-size: 2.4rem;
    line-height: 2.431rem;
  }
`;

export const CodeRankingSubheader = styled(CodeRankingHeader)`
  color: ${blueColor};
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.36rem;
  text-align: left;
  text-transform: none;
  margin: 0;

  @media (max-width: 500px) {
    font-size: 2.2rem;
  }

  @media (max-width: 370px) {
    font-size: 2rem;
  }
`;

export const CodeRankingText = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  margin: ${({ isIndented }) =>
    isIndented ? '2rem 0 2rem 2.5rem' : '1rem 0 0'};
`;

export const ContentGroup = styled.div`
  margin-bottom: ${({ isLastGroup }) => (isLastGroup ? '1rem' : '3rem')};
`;
