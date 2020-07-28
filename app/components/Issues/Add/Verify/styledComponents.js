import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  headerFontSize,
  hoverLinkColor,
  lightBlueColor,
  subHeaderColor,
  textColor,
} from 'defaultStyleHelper';

export const DataWrapper = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  margin: 0 0 10rem 0;
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  margin: 0 0.5rem 0 0;
`;

export const LabelWrapper = styled.h3`
  align-items: center;
  color: ${subHeaderColor};
  display: inline-flex;
  font-size: ${detailFontSize};
  margin: 0;
`;

export const LabelText = styled.div`
  display: inline-flex;
`;

export const LanguageContainer = styled.div`
  display: inline-block;
`;

export const NameWrapper = styled.div`
  font-size: ${headerFontSize};
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledInlineBlock = styled.div`
  width: 30%;
`;

export const StyledLink = styled.a`
  color: ${lightBlueColor};
  display: inline-block;
  margin: 0 1rem;
  width: auto;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const Divider = styled.div`
  border-bottom: 0.1rem solid ${borderColor};
  width: 100%;
`;

export const ValueWrapper = styled.div`
  display: flex;
  margin: 0.5rem 1rem 0.5rem 1rem;
`;
