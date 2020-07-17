import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';
import {
  borderColor,
  codeGrey,
  commentHeaderColor,
  defaultFontFamily,
  defaultFontSize,
  styledScrollbar,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const CommentBody = styled.div`
  ${styledScrollbar}
  font-size: ${defaultFontSize};
  max-height: 150rem;
  min-height: 4rem;
  overflow-y: auto;
  padding: 0 0.8rem;
  width: 100%;

  * {
    background-color: white;
    color: ${textColor};
    font-family: inherit;
    max-width: 100%;
  }
`;

export const CommentContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 1px solid ${borderColor};
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
    border-color: transparent #f6f8fa transparent transparent;
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
    font-family: ${defaultFontFamily};
    white-space: pre-wrap;
  }

  image {
    width: auto;
  }

  pre {
    background-color: ${codeGrey};
    padding: 0.5rem;
    max-height: 75rem;
    overflow-y: auto;
    overflow-x: hidden;
    ${styledScrollbar}
  }
`;

export const CommentHeader = styled.div`
  background-color: ${props =>
    props.primary ? `transparent` : commentHeaderColor};
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 0.8rem;
  width: 100%;
`;

export const FlexContainer = styled.div`
  display: flex;
  margin: 3rem 0;
  width: 100%;
`;

export const NewCommentContainer = styled.div`
  text-align: right;
  width: 100%;
`;

export const ProfileImageContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export const StyledNoComments = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin: 2rem 0;
  text-align: center;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  display: inline-block;
  margin: 1rem 0 0 0;
  width: auto;
`;

export const UsernameLink = styled.a`
  display: inline;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`;
