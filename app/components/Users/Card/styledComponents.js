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

const { mobile } = mediaQueriesByDevice;

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
  justify-content: space-between;
  margin-left: 1rem;

  ${mobile} {
    justify-content: center;
    margin-left: 2rem;
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
`;

export const StyledSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledSquare = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;
