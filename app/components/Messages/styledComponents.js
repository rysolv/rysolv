import styled from 'styled-components';

import { LanguageWrapper } from 'components/base_ui';
import {
  blueColor,
  candidateGreyColor,
  defaultFontSize,
  grayColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const CandidateCardButton = styled.button`
  align-items: center;
  background: ${candidateGreyColor};
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  border: none;
  color: ${blueColor};
  display: flex;
  font-size: 1.6rem;
  height: 5.175rem;
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
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  color: ${blueColor};
  display: flex;
  flex-direction: column;
  width: 28.5rem;
`;

export const CandidateCardContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
`;

export const CandidateCardDataCell = styled.div`
  flex: ${({ isTop }) => (isTop ? 1 : 0)};
  margin-bottom: 1.6rem;
`;

export const CandidateCardRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.4rem;
  width: 50%;
`;

export const CandidateCardRows = styled.div`
  display: flex;
`;

export const CandidateCardUserInfo = styled.div`
  text-align: center;
`;

export const ConversationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: ${({ isMobile }) => (isMobile ? '100%' : '27.8rem')};
  min-height: 65vh;
  width: ${({ isMobile }) => (isMobile ? '100%' : '22%')};
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

export const MessageContainer = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 25rem);

  ${laptop} {
    width: 100%;
  }
`;

export const NameWrapper = styled.div`
  font-size: 2.5rem;
`;

export const PositionWrapper = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  margin: 0.8rem 0 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfilePicWrapper = styled.img`
  border-radius: 50%;
  border: 0.2rem solid ${whiteColor};
  height: 5rem;
  margin-right: 0.8rem;
  width: 5rem;
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
