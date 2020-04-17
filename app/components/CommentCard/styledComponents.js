import styled from 'styled-components';

import { borderColor, commentHeaderColor, textColor } from 'defaultStyleHelper';

export const ProfileContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export const CommentContainer = styled.div`
  background-color: white;
  vertical-align: top;
  display: inline-block;
  width: 100%;
  border: ${props => (props.primary ? `none` : `1px solid ${borderColor}`)};
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const CommentHeader = styled.div`
  width: 100%;
  padding: 0.4rem;
  background-color: ${props => (props.primary ? `none` : commentHeaderColor)};
  border-bottom: 1px solid ${borderColor};
  font-size: 0.8rem;
`;

export const CommentBody = styled.div`
  width: 100%;
  padding: 0 1rem;
  min-height: 4rem;
  * {
    color: ${textColor};
    background-color: white;
    width: 100%;
    font-style: inherit;
  }
`;

export const ProfileLine = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 0.2rem;
  vertical-align: top;
  margin: 2.5rem 0 0 0;
`;
