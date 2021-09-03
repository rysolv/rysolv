import styled from 'styled-components';

import { LanguageWrapper } from 'components/base_ui';
import {
  blueColor,
  grayColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

export const CandidateCardButton = styled.button`
  align-items: center;
  background: #f5f5f5;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  border: none;
  color: ${blueColor};
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }

  &:focus {
    outline: 0;
  }

  svg {
    margin-right: 0.4rem;
  }
`;

export const CandidateCardContainer = styled.div`
  background: ${whiteColor};
  border-radius: 0.8rem;
  border: 0.3rem solid ${({ isSaved }) => (isSaved ? blueColor : grayColor)};
  color: ${blueColor};
  display: flex;
  flex-direction: column;
  height: 37.5rem;
  justify-content: space-between;
  width: 28.5rem;
`;

export const CandidateCardContent = styled.div`
  padding: 2rem;
`;

export const CandidateCardDataCell = styled.div`
  margin-bottom: 1.6rem;
`;

export const CandidateCardRow = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 1.4rem;
  text-transform: capitalize;
`;

export const Divider = styled.div`
  background: #f5f5f5;
  height: 0.2rem;
  width: 100%;
  margin: 1.6rem 0;
`;

export const NameWrapper = styled.div`
  font-size: 2.5rem;
`;

export const PicWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PositionWrapper = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  margin: 0.8rem 0 1.6rem;
`;

export const ProfilePicWrapper = styled.img`
  border-radius: 50%;
  border: 0.2rem solid #f5f5f5;
  height: 5rem;
  margin-right: 0.8rem;
  width: 5rem;
`;

export const StyledLanguageWrapper = styled(LanguageWrapper)`
  font-size: 1.4rem;
`;

export const Title = styled.div`
  color: ${grayColor};
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
`;
