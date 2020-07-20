import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkWrapper = styled(Link)`
  color: #007bff;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

export const NotFoundIcon = styled.div`
  align-items: center;
  display: flex;
  font-size: 10rem;
  font-weight: bolder;
  height: 100%;
  justify-content: center;
  letter-spacing: 0.2rem;
  white-space: nowrap;
`;
