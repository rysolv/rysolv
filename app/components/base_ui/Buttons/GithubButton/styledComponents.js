import styled from 'styled-components';

import {
  darkBlueColor,
  defaultFontFamily,
  whiteColor,
} from 'defaultStyleHelper';

export const LabelWrapper = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
`;

export const StyledGithubButton = styled.a`
  align-items: center;
  background: ${darkBlueColor};
  border-radius: 0.8rem;
  color: ${whiteColor};
  display: flex;
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  justify-content: center;
  letter-spacing: 0.02857em;
  line-height: 1.936rem;
  margin: 1rem;
  padding: 0.6rem 1.6rem;
  text-align: center;
  text-transform: none;
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
