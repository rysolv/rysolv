import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import {
  borderColor,
  codeFontFamily,
  codeGrey,
  defaultFontSize,
  headerColor,
  hoverLinkColor,
  lightBlueColor,
  styledScrollbar,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const Body = styled.div`
  ${styledScrollbar}
  font-size: ${defaultFontSize};
  min-height: 4rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 1rem;
  width: 100%;

  * {
    background: white;
    color: ${textColor};
    font-family: inherit;
    max-width: 100%;
  }

  a {
      color: ${hoverLinkColor}
  }
`;

export const CommentContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  margin-left: 1.6rem;
  position: relative;
  width: 100%;

  &:after,
  &:before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    left: 0;
    position: absolute;
    width: 0;
  }

  &:after {
    border-color: transparent ${headerColor} transparent transparent;
    border-width: 9px;
    left: -18px;
    top: 8px;
  }

  &:before {
    border-color: transparent ${borderColor} transparent transparent;
    border-width: 10px;
    left: -20px;
    top: 7px;
  }

  code {
    background-color: ${codeGrey};
    border-radius: 0.25rem;
    color: ${textColor};
    font-family: ${codeFontFamily};
    white-space: pre-wrap;
  }

  image {
    width: auto;
  }

  pre {
    ${styledScrollbar}
    background-color: ${codeGrey};
    max-height: 75rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.5rem;
  }
`;

export const CommentHeader = styled.div`
  background-color: ${headerColor};
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
  color: white;
  display: flex;
  font-size: ${defaultFontSize};
  justify-content: space-between;
  padding: 0.8rem;
  width: 100%;
`;

export const FlexContainer = styled.div`
  display: flex;
  margin: 3rem 0;
  width: 100%;
`;

export const GithubIconWrapper = styled.span`
  vertical-align: middle;
`;

export const IssueBodyContainer = styled.div`
  background: white;
  border-radius: 0.25rem;
  border: none;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  width: 100%;

  code {
    background-color: ${codeGrey};
    border-radius: 0.25rem;
    color: ${textColor};
    font-family: ${codeFontFamily};
    white-space: pre-wrap;
  }

  image {
    width: auto;
  }

  pre {
    ${styledScrollbar}
    background-color: ${codeGrey};
    max-height: 75rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.5rem;
  }
`;

export const NewCommentContainer = styled.div`
  text-align: right;
  width: 100%;
`;

export const NoCommentContainer = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin: 2rem 0;
  text-align: center;
`;

export const ProfileImageContainer = styled.div`
  display: inline-block;
  margin-right: ${({ addMargin }) => (addMargin ? '1rem' : '0')};
  vertical-align: top;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  display: inline-block;
  margin: 1rem 0 0 0;
  width: auto;
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background-color: white;
  color: ${lightBlueColor};
  margin: 1rem 0.5rem 0 0;
  width: 9rem;

  &:hover {
    background-color: white;
    box-shadow: none;
  }
`;

export const UsernameExternalLink = styled.a`
  display: inline;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const UsernameLink = styled(Link)`
  display: inline;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
