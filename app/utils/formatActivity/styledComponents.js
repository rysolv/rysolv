import styled from 'styled-components';

const StyledActivityIcon = styled.div`
  align-items: center;
  background-color: #c4efe0;
  border-radius: 50%;
  color: #31b589;
  display: flex;
  height: 2.4rem;
  place-content: center;
  position: absolute;
  width: 2.4rem;
`;

export const StyledAddIcon = styled(StyledActivityIcon)`
  background-color: #c4efe0;
  color: #31b589;
`;

export const StyledRemoveIcon = styled(StyledActivityIcon)`
  background-color: #ffcdd2;
  color: #b71c1c;
`;

export const StyledPullRequestIcon = styled(StyledActivityIcon)`
  background-color: #fcdbc6;
  color: #f47e34;
`;

export const StyledCommentIcon = styled(StyledActivityIcon)`
  background-color: #bbdefb;
  color: #1976d2;
`;
