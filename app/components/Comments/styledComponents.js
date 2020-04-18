import styled from 'styled-components';

import { borderColor, commentHeaderColor, textColor } from 'defaultStyleHelper';

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
  font-size: 0.8rem;
  padding: 0.4rem;
  width: 100%;
`;

export const CommentBody = styled.div`
  min-height: 4rem;
  padding: 0 1rem;
  width: 100%;
  * {
    background-color: white;
    color: ${textColor};
    font-style: inherit;
    width: 100%;
  }
`;

export const ProfileLine = styled.div`
  background-color: ${borderColor};
  display: inline-block;
  height: 0.2rem;
  margin: 2.5rem 0 0 0;
  vertical-align: top;
  width: 1.5rem;
`;
