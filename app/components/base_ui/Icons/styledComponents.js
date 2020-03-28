import styled from 'styled-components';

import { hyperlinkColor } from 'defaultStyleHelper';

export const StyledComment = styled.div`
  color: gray;
  display: inline-block;
  text-align: center;
`;

export const StyledSettings = styled.div`
  color: #424242;
  display: inline-block;
  text-align: center;

  &:hover {
    color: ${hyperlinkColor};
    cursor: pointer;
  }
`;

export const StyledStar = styled.div`
  color: #ffd600;
  display: inline-block;
  text-align: center;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledVerified = styled.div`
  color: #0288d1;
  display: inline-block;
  text-align: center;
`;

export const StyledUpvote = styled.div`
  color: gray;
  display: inline-block;
  text-align: center;

  &:hover {
    color: #ff5722;
    cursor: pointer;
  }
`;
