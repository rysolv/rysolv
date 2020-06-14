import styled from 'styled-components';

export const styledActivityIcon = styled.div`
  align-items: center;
  background-color: #c4efe0;
  border-radius: 50%;
  color: #31b589;
  display: flex;
  height: 2.4rem;
  place-content: center;
  width: 2.4rem;
  position: absolute;
`;

export const StyledAddIcon = styled(styledActivityIcon)`
  background-color: #c4efe0;
  color: #31b589;
`;

export const StyledRemoveIcon = styled(styledActivityIcon)`
  background-color: #ffcdd2;
  color: #b71c1c;
`;

export const StyledPullRequestIcon = styled(styledActivityIcon)`
  background-color: #fcdbc6;
  color: #f47e34;
`;

export const StyledCommentIcon = styled(styledActivityIcon)`
  background-color: #bbdefb;
  color: #1976d2;
`;
