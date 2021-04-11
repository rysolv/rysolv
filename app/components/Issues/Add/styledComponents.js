import styled from 'styled-components';

import { BaseLink, BaseTextInputWithAdornment } from 'components/base_ui';
import {
  defaultFontSize,
  detailFontSize,
  errorRed,
  hoverLinkColor,
  lightBlueColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImportFormContainer = styled.section`
  color: ${textColor};
  font-size: 2.4rem;
  font-weight: 300;
  line-height: 4rem;
  margin: auto;
  padding: 4rem 2rem;
  text-align: left;
  width: 80%;

  ${mobile} {
    width: 100%;
  }

  * {
    font-size: ${defaultFontSize};
  }

  .MuiFormHelperText-root {
    font-size: ${detailFontSize};
  }

  &:focus {
    outline: none;
  }
`;

export const InputFormWrapper = styled.div`
  padding: 0 2rem;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
  white-space: pre;

  * {
    font-size: 1.6rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const StyledBaseLink = styled(BaseLink)`
  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const StyledBaseTextInputWithAdornment = styled(
  BaseTextInputWithAdornment,
)`
  margin: 0 !important;
`;

export const StyledImportError = styled.div`
  color: ${errorRed};
  font-size: ${detailFontSize};
  line-height: ${defaultFontSize};
  padding: 0 1rem 2rem;
  text-align: left;
`;

export const StyledLabel = styled.div`
  color: ${lightBlueColor};
  font-size: ${subheaderFontSize};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledMarkdownWrapper = styled.div`
  color: ${textColor};
  font-size: 1.2rem;
  padding: 1rem;
`;
