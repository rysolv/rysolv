import styled from 'styled-components';

import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const ActiveContainer = styled.div`
  color: #388e3c;
  font-weight: 500;
`;

export const ContentWrapper = styled.div`
  align-self: center;
  display: flex;
`;

export const IconWrapper = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  justify-content: center;
  margin: 0.5rem 0;
`;

export const ImageContainer = styled.div`
  margin: 1rem 0 0 0;
`;

export const IssuesContainer = styled.div`
  font-weight: 500;
`;

export const IssuesWrapper = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  padding-top: 1rem;
`;

export const MemberInfoContainer = styled.div`
  color: #6a737d;
  font-size: ${detailFontSize};
  line-height: 2rem;
`;

export const MemberWrapper = styled.div`
  align-self: center;
`;

export const NameWrapper = styled.a`
  font-size: ${subheaderFontSize};

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

export const StyledListSquare = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #e0e0e0;
  color: ${textColor};
  margin: 1rem;
  padding: 1rem;
  width: 20rem;
`;

export const StyledSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledSquare = styled.div`
  display: flex;
  flex-direction: column;
  height: 0;
  padding-bottom: 100%;
`;
