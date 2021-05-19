import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledImage = styled.img`
  border-radius: ${({ isSquare }) => (isSquare ? '0' : '50%')};
  height: ${({ size }) => size || '4rem'};
  width: ${({ size }) => size || '4rem'};
  object-fit: ${({ isCircle }) => (isCircle ? 'cover' : 'contain')};
`;

export const StyledLink = styled(Link)`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
