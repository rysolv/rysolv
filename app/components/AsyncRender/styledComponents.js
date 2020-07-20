import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const IconWrapper = styled.div`
  svg {
    height: 10rem;
    width: 10rem;
  }
`;

export const LinkWrapper = styled(Link)`
  color: #007bff;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;
