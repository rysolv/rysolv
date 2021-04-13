import styled from 'styled-components';

import { headerColor, landingButtonGreen } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptopS, mobile, mobileXXS } = mediaQueriesByDevice;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  max-width: fit-content;
  padding: 5rem 3rem 5rem 5rem;
  width: 45%;

  ${mobile} {
    width: 100%;
  }
`;

export const CreateAccountButton = styled.a`
  background: ${landingButtonGreen};
  border-radius: 10.2rem;
  color: white;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.03em;
  line-height: 1.5;
  margin-bottom: 0;
  margin-top: 30px;
  padding: 0.6rem 1.2rem 0.6rem 1.8rem;
  white-space: nowrap;
  width: fit-content;

  svg {
    font-size: 2rem;
    stroke-width: 0;
    stroke: currentColor;
  }

  &:hover {
    background: #17807d;
    color: white;
    cursor: pointer;
  }
`;

export const LogoText = styled.div`
  color: white;
  display: flex;
  font-size: 2.6rem;
  letter-spacing: 0.2rem;
  user-select: none;
  white-space: nowrap;
`;

export const SplashBackground = styled.div`
  &:before {
    background-color: ${headerColor};
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
    content: '';
    height: 70rem;
    left: 0;
    padding: 2rem;
    position: absolute;
    top: -10rem;
    width: 100%;
  }
`;

export const SplashContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  left: 0;
  padding: 0 2rem;
  position: absolute;
  top: 10rem;
  width: 100%;

  ${laptopS} {
    top: 10rem;
  }

  ${mobile} {
    flex-direction: column-reverse;
    top: 5rem;
  }
`;

export const TagLine = styled.p`
  color: white;
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  line-height: 3rem;
  opacity: 0.5;
  user-select: none;

  ${mobileXXS} {
    line-height: 2.5rem;
  }
`;
