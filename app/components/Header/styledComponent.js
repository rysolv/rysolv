import styled from 'styled-components';
import { BaseLink } from 'components/base_ui';

export const Admin = styled(BaseLink)`
  &:hover {
    text-decoration: underline;
  }
  svg {
    transform: translateY(-0.15rem);
  }
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 4rem;
  text-decoration: none;
`;

export const ButtonsWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const Login = styled(BaseLink)`
  &:hover {
    text-decoration: underline;
  }
  svg {
    transform: translateY(-0.15rem);
  }
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 4rem;
  text-decoration: none;
`;

export const SignUp = styled(BaseLink)`
  &:hover {
    text-decoration: underline;
  }
  svg {
    transform: translateY(-0.15rem);
  }
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 4rem;
  text-decoration: none;
`;

export const Test = styled(BaseLink)`
  margin: 0 2rem 0 0;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;
