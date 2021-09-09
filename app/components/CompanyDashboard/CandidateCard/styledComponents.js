import styled from 'styled-components';

import { IconButton, LanguageWrapper } from 'components/base_ui';
import {
  blueColor,
  candidateGreyColor,
  defaultFontSize,
  grayColor,
  textColor,
} from 'defaultStyleHelper';

export const CandidateCardButton = styled.button`
  align-items: center;
  background: ${candidateGreyColor};
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  border: none;
  color: ${blueColor};
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
  padding: 1rem;
  width: 100%;

  &:hover {
    background-color: ${candidateGreyColor};
    cursor: pointer;
  }

  svg {
    margin-right: 0.4rem;
  }
`;

export const CandidateCardContainer = styled.div`
  border-radius: 0.7rem;
  border: 0.3rem solid ${({ isSaved }) => (isSaved ? blueColor : grayColor)};
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  color: ${blueColor};
  height: 37.5rem;
  margin: 0 4rem ${({ isLast }) => (isLast ? '0' : '4rem')} 0;
  position: relative;
  width: 28.5rem;
`;

export const CandidateCardContent = styled.div`
  padding: 2rem;
`;

export const CandidateCardDataCell = styled.div`
  margin-bottom: 1.6rem;
`;

export const CandidateCardRow = styled.div`
  width: 50%;
`;

export const CandidateCardRows = styled.div`
  display: flex;
`;

export const CandidateCardUserInfo = styled.div`
  text-align: center;
`;

export const Data = styled.div`
  color: ${blueColor};
  font-size: ${defaultFontSize};
  text-transform: capitalize;
`;

export const Divider = styled.div`
  background: ${candidateGreyColor};
  height: 0.2rem;
  width: 100%;
  margin: 1.6rem 0;
`;

export const ImageGroup = styled.div`
  display: flex;
  justify-content: center;
`;

export const NameWrapper = styled.div`
  font-size: 2.5rem;
`;

export const PositionWrapper = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  margin: 0.8rem 0 1.6rem;
`;

export const ProfilePicWrapper = styled.img`
  border-radius: 50%;
  border: 0.2rem solid ${candidateGreyColor};
  height: 5rem;
  margin-right: 0.8rem;
  width: 5rem;
`;

export const StyledIconButton = styled(IconButton)`
  margin: 0.4rem;
  position: absolute;
  right: 0;

  svg {
    color: ${({ isSaved }) => (isSaved ? blueColor : grayColor)};
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const StyledLanguageWrapper = styled(LanguageWrapper)`
  font-size: ${defaultFontSize};
`;

export const Title = styled.div`
  color: ${grayColor};
  font-size: ${defaultFontSize};
  margin-bottom: 0.4rem;
  text-transform: uppercase;
`;
