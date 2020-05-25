import styled from 'styled-components';

import {
  defaultFontSize,
  detailFontSize,
  hyperlinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImportFormContainer = styled.section`
  color: ${textColor};
  font-size: 2.4rem;
  font-weight: 300;
  height: 50%;
  line-height: 4rem;
  margin: auto;
  padding: 5rem 0;
  text-align: center;
  width: 80%;

  * {
    font-size: ${defaultFontSize};
  }

  .MuiFormHelperText-root {
    font-size: ${detailFontSize};
  }
`;

export const InputFormWrapper = styled.div`
  padding: 0 6.5rem;
`;

export const KeyAndValueContainer = styled.div`
  display: flex;
`;

export const KeyGroupWrapper = styled.div`
  padding-right: 2rem;
`;

export const KeyWrapper = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
  text-decoration: underline;
  min-width: 15rem;
`;

export const StyledLabel = styled.div`
  color: ${hyperlinkColor};
  font-size: ${subheaderFontSize};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ValueWrapper = styled.div`
  display: flex;
  color: ${textColor};
  flex-direction: row;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
`;
