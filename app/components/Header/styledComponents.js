import styled from 'styled-components';

import { BaseLink } from 'components/base_ui';
import { defaultFontSize } from 'defaultStyleHelper';

export const ButtonsWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const Signin = styled(BaseLink)`
  &:hover {
    text-decoration: underline;
  }
  svg {
    transform: translateY(-0.15rem);
  }
  color: white;
  font-size: ${defaultFontSize};
  font-weight: 500;
  margin: 0 4rem 0 2rem;
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
  font-size: ${defaultFontSize};
  font-weight: 500;
  margin: 0 2rem;
  text-decoration: none;
`;

export const Browse = styled(BaseLink)`
  margin: 0 2rem;
  font-size: ${defaultFontSize};
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;
