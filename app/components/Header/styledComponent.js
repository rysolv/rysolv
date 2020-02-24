import styled from 'styled-components';
import { BaseLink } from 'components/base_ui';

export const AboutUs = styled(BaseLink)`
  &:hover {
    text-decoration: underline;
  }
  svg {
    transform: translateY(-0.15rem);
  }
  color: 'pink';
  font-size: 1.4rem;
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
  color: 'pink';
  font-size: 1.4rem;
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
  color: 'pink';
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 4rem;
  text-decoration: none;
`;
