import styled from 'styled-components';

import { defaultFontFamily, headerColor } from 'defaultStyleHelper';

export const LabelWrapper = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
`;

export const StyledGithubButton = styled.a`
  align-self: center;
  background-color: ${headerColor};
  border-radius: 0.4rem;
  color: white;
  font-family: ${defaultFontFamily};
  font-size: 1.2rem;
  letter-spacing: 0.02857em;
  line-height: 1.75;
  margin: 1rem;
  padding: 0.6rem 1.6rem;
  text-align: center;
  text-transform: uppercase;
  width: 95%;

  &:hover {
    color: white;
  }

  svg {
    height: 2rem;
    margin-right: 1rem;
    width: 2rem;
  }
`;
