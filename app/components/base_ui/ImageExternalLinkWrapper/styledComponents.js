import styled from 'styled-components';

export const StyledImage = styled.img`
  border-radius: ${({ isSquare }) => (isSquare ? '0' : '50%')};
  height: ${({ size }) => size || '4rem'};
  width: ${({ size }) => size || '4rem'};
`;

export const StyledLink = styled.a`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
