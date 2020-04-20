import styled from 'styled-components';

import { hoverLinkColor, textColor } from 'defaultStyleHelper';

export const ActiveContainer = styled.div`
  color: #388e3c;
  font-weight: 500;
`;

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const ContentWrapper = styled.div`
  align-self: center;
  display: flex;
`;

export const DescriptionWrapper = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  align-self: center;
  text-align: center;
`;

export const IssuesContainer = styled.div`
  font-weight: 500;
`;

export const IssuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;

export const MemberInfoContainer = styled.div`
  line-height: 1.5rem;
`;

export const MemberWrapper = styled.div`
  align-self: center;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 55rem;
  justify-content: center;
  text-align: center;
`;

export const NameWrapper = styled.a`
  font-size: 1.4rem;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const NumberContainer = styled.div`
  align-self: center;
  padding-left: 0.5rem;
  font-weight: 500;
`;

export const StyledUserCard = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 10%;
  width: 80%;
`;

export const StyledListSquare = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #e0e0e0;
  margin: 1rem;
  padding: 1rem;
  width: 17.7rem;
`;

export const StyledSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledSquare = styled.div`
  display: flex;
  height: 0;
  padding-bottom: 100%;
  flex-direction: column;
`;
