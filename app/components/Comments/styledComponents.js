import styled from 'styled-components';

import {
  borderColor,
  commentHeaderColor,
  textColor,
  defaultFontSize,
  subheaderFontSize,
  detailFontSize,
} from 'defaultStyleHelper';
import { PrimaryButton } from 'components/base_ui';

export const FlexContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export const CommentContainer = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  border: ${props => (props.primary ? `none` : `1px solid ${borderColor}`)};
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  width: 100%;
`;

export const CommentHeader = styled.div`
  background-color: ${props => (props.primary ? `none` : commentHeaderColor)};
  border-bottom: 1px solid ${borderColor};
  font-size: ${detailFontSize};
  padding: 0.4rem;
  width: 100%;
`;

export const CommentBody = styled.div`
  min-height: 4rem;
  padding: 0 1rem;
  font-size: ${defaultFontSize};
  width: 100%;
  * {
    background-color: white;
    color: ${textColor};
    font-family: inherit;
    width: 100%;
  }
`;

export const ProfileLine = styled.div`
  background-color: ${borderColor};
  display: inline-block;
  height: 0.2rem;
  margin: 2rem 0 0 0;
  vertical-align: top;
  width: 1.5rem;
`;

export const NewCommentContainer = styled.div`
  width: 100%;
  text-align: right;
`;

export const StyledNoComments = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  text-align: center;
  margin: 2rem 0;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  width: auto;
  margin: 1rem 0 0 0;
  display: inline-block;
`;

export const UsernameLink = styled.a`
  font-weight: bold;
  display: inline;

  &:hover {
    color: ${textColor};
  }
`;
