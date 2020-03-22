import styled from 'styled-components';

import { hyperlinkColor } from 'defaultStyleHelper';

export const StyledSettings = styled.div`
  color: #424242;
  display: inline-block;
  text-align: center;
  &:hover {
    cursor: pointer;
    color: ${hyperlinkColor};
  }
`;

export const StyledVerified = styled.div`
  color: #0288d1;
  text-align: center;
  display: inline-block;
`;

export const StyledComment = styled.div`
  color: gray;
  text-align: center;
  display: inline-block;
`;

export const StyledUpvote = styled.div`
  color: gray;
  text-align: center;
  display: inline-block;

  &:hover {
    cursor: pointer;
    color: #ff5722;
  }
`;
