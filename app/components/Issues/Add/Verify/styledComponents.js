import styled from 'styled-components';

import {
  headerFontSize,
  borderColor,
  defaultFontSize,
  detailFontSize,
  subHeaderColor,
  hyperlinkColor,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  color: ${textColor};
  margin: 0 0 10rem 0;
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  margin: 0 0.5rem 0 0;
`;

export const LabelWrapper = styled.h3`
  font-size: ${detailFontSize};
  color: ${subHeaderColor};
  display: inline-flex;
  margin: 0;
  align-items: center;
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
  display: inline-block;
  width: auto;
  color: ${hyperlinkColor};

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
