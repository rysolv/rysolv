import styled from 'styled-components';

import { hyperlinkColor } from 'defaultStyleHelper';

export const StyledBack = styled.div`
  color: inherit;
  display: inline-block;
  text-align: center;
`;

export const StyledCode = styled.div`
  color: white;
`;

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
  color: rgb(8, 178, 110);
  display: inline-block;
  text-align: center;
`;

export const StyledUpvote = styled.div`
  color: #37474f;
  display: inline-block;
  text-align: center;

  &:hover {
    color: #ff5722;
    cursor: pointer;
  }
`;
