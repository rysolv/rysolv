import styled from 'styled-components';

import { BaseLink, BaseTextInputWithAdornment } from 'components/base_ui';
import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  errorRed,
  hoverLinkColor,
  lightBlueColor,
  styledScrollbar,
  subheaderFontSize,
  successGreen,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const AddContainer = styled.div`
  svg {
    color: ${({ disabled }) => (disabled ? `grey` : successGreen)};
    font-size: 3rem;
    :hover {
      color: ${({ disabled }) => (disabled ? 'grey' : '#288f6d')};
      cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    }
  }
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconContainer = styled.div`
  display: inline;
  margin: 0 0.5rem 0 0;
`;

export const ImportCardWrapper = styled.li`
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  list-style-type: none;
  margin: 0.5rem;
  padding: 0.25rem 0;
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

export const OrganizationNameWrapper = styled.div`
  color: ${textColor};
  font-size: ${detailFontSize};
  font-weight: bold;
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

export const StyledIssueBody = styled.div`
  width: 100%;
`;

export const StyledIssueContent = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  justify-content: space-between;
  line-height: normal;
  padding-left: 1rem;
  place-items: center;
  width: 100%;
`;

export const StyledIssueHeader = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  height: 2rem;
  justify-content: space-between;
  padding: 0 0.5rem 0 1rem;
  width: 100%;
`;

export const StyledIssueTitle = styled.div`
  text-align: left;

  :hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const StyledLabel = styled.div`
  color: ${lightBlueColor};
  font-size: ${subheaderFontSize};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledMarkdownWrapper = styled.div`
  color: ${textColor};
  font-size: 1.2rem;
  padding: 1rem;
`;

export const StyledLinkContainer = styled.div`
  display: inline;
  vertical-align: middle;
`;

export const TextWrapper = styled.div`
  font-size: 1.6rem;
  margin-top: 2rem;
`;

export const UserIssuesContainer = styled.div`
  ${styledScrollbar}
  color: ${textColor};
  max-height: 75rem;
  overflow-y: auto;
  text-align: center;
`;
