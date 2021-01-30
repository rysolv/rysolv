import styled from 'styled-components';

import {
  fundingClosedBackground,
  fundingOpenBackground,
  fundingText,
  languageBackground,
  languageText,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, mobileXXS } = mediaQueriesByDevice;

export const CircleOne = styled.div`
  background: #ff6057;
  border-radius: 50%;
  height: 0.5rem;
  margin-right: 0.3rem;
  width: 0.5rem;
`;

export const CircleThree = styled.div`
  background: #28ca43;
  border-radius: 50%;
  height: 0.5rem;
  margin-right: 0.3rem;
  width: 0.5rem;
`;

export const CircleTwo = styled.div`
  background: #ffbe2f;
  border-radius: 50%;
  height: 0.5rem;
  margin-right: 0.3rem;
  width: 0.5rem;
`;

export const CircleWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 0.5rem;
`;

export const Image = styled.img`
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  height: auto;
  width: 100%;
`;

export const ImageNavBar = styled.div`
  background: #e8e8e8;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  height: 1.5rem;
  justify-content: space-between;
`;

export const Row = styled.div`
  background: #b3b3b3;
  border-radius: 0.2rem;
  height: 0.2rem;
  margin-bottom: 0.125rem;
  width: 1rem;
`;

export const RowWrapper = styled.div`
  align-self: center;
  padding: 0 1rem;
`;

export const StyledImageWrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: 6px 28px 77px -24px rgba(0, 0, 0, 1);
  height: fit-content;
  max-width: 80rem;
  width: 55%;

  ${mobile} {
    width: 85%;
  }

  ${mobileXXS} {
    width: 95%;
  }
`;

export const StyledFundingWrapper = styled.div`
  background-color: ${({ open }) =>
    open ? fundingOpenBackground : fundingClosedBackground};
  border-radius: 0.25rem;
  color: ${({ open }) => (open ? fundingText : '0')};
  display: inline-flex;
  font-size: ${({ medium }) => (medium ? '1.4rem' : 'inherit')};
  font-weight: 700;
  line-height: 2rem;
  padding: 0.2rem 1rem;
  white-space: nowrap;
`;

export const StyledLanguageWrapper = styled.div`
  background-color: ${languageBackground};
  border-radius: 0.25rem;
  color: ${languageText};
  display: inline-flex;
  font-size: inherit;
  margin: 0 0.5rem 0.5rem 0;
  padding: 0.5rem;
`;

export const StyledRewardWrapper = styled.div`
  background: rgb(150, 112, 255);
  border-radius: 0.25rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
  padding: 0.2rem 1rem;
  white-space: nowrap;
`;
