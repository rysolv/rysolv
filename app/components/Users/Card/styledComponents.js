import styled from 'styled-components';

import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  subheaderFontSize,
  subTextColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, mobileS } = mediaQueriesByDevice;

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
  margin-top: 0.25rem;
`;

export const ImageContainer = styled.div`
  margin: 0.5rem 0 0 0;
`;

export const IssuesContainer = styled.div`
  color: ${subTextColor};
  font-weight: 500;
`;

export const IssuesWrapper = styled.div`
  display: flex;
  font-size: ${detailFontSize};
  justify-content: space-between;
  padding-top: 1rem;
`;

export const MemberInfoContainer = styled.div`
  color: ${subTextColor};
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

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: start;
  margin-left: 1rem;

  ${mobile} {
    margin-left: 2rem;
  }

  ${mobileS} {
    margin-left: 0;
  }
`;

export const StyledListSquare = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #e0e0e0;
  color: ${textColor};
  margin: 0 1rem 1rem 0;
  padding: 0.5rem;
  width: 17.5rem;

  ${mobile} {
    margin: 0 2rem 2rem 0;
    width: auto;
  }

  ${mobileS} {
    margin-right: 0;
    padding: 0 1rem;
    width: 100%;
  }
`;

export const StyledSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledSquare = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  ${mobileS} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const TextContainer = styled.div`
  ${mobileS} {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 70%;
  }
`;

export const Users = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 0 1rem 1rem;
  text-align: end;
  width: 100%;

  ${mobile} {
    padding: 0 0 1rem;
  }
`;
