import styled from 'styled-components';

import { BaseLink, BaseTextInputWithAdornment } from 'components/base_ui';
import {
  borderColor,
  cardHeaderFontSize,
  defaultFontSize,
  detailFontSize,
  errorRed,
  hoverGreen,
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
  place-self: center;

  svg {
    color: ${({ disabled }) => (disabled ? `grey` : successGreen)};
    font-size: 3rem;
    :hover {
      color: ${({ disabled }) => (disabled ? 'grey' : hoverGreen)};
      cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const DescriptionWrapper = styled.div`
  color: ${textColor};
  display: ${({ hasValue }) => (hasValue ? 'flex' : 'none')};
  font-size: ${defaultFontSize};
  padding: 1rem 0;
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
  padding: 0 6.5rem;
`;

export const LogoWrapper = styled.img`
  display: inline-flex;
  height: 7rem;
  margin: 0 2rem 0 0;
  width: 7rem;
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

export const RepoName = styled.div`
  color: ${textColor};
  font-size: ${cardHeaderFontSize};
  margin: 0.5rem 0;
`;

export const RepoNameWrapper = styled.div`
  align-self: center;
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

export const StyledIcon = styled.div`
  color: ${textColor};
  padding-right: 0.5rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledImportError = styled.div`
  color: ${errorRed};
  font-size: ${detailFontSize};
  line-height: ${defaultFontSize};
  padding: 0 0 2rem;
  text-align: left;
`;

export const StyledLabel = styled.div`
  color: ${lightBlueColor};
  font-size: ${subheaderFontSize};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledLink = styled.a`
  align-items: center;
  color: ${hoverLinkColor};
  display: ${({ hasValue }) => (hasValue ? 'flex' : 'none')};
  font-size: ${defaultFontSize};
  margin-right: 2rem;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledLinkContainer = styled.div`
  display: inline;
  text-align: left;
  vertical-align: middle;
`;

export const StyledRepoBody = styled.div`
  width: 100%;
`;

export const StyledRepoHeader = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  height: 2rem;
  padding: 0 1rem;
  width: 100%;
`;

export const StyledRepoTitle = styled.div`
  align-self: flex-start;
  display: flex;
  font-size: ${defaultFontSize};
  line-height: normal;
  padding-left: 1rem;
  width: 100%;

  :hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const TextWrapper = styled.div`
  font-size: 1.6rem;
  margin-top: 2rem;
`;

export const UserReposContainer = styled.div`
  ${styledScrollbar}
  max-height: 75rem;
  overflow-y: auto;
  text-align: center;
`;

export const ValueWrapper = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  padding: 1rem 0;
`;

export const VerifyWrapper = styled.div`
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  margin: 0 0 4rem 0;
  padding: 1rem;
`;
