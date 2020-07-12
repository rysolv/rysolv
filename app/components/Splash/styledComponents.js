import styled from 'styled-components';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptopS, mobile, mobileXXS } = mediaQueriesByDevice;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const CircleOne = styled.div`
  background: #ff6057;
  border-radius: 50%;
  height: 0.5rem;
  margin-right: 0.3rem;
  width: 0.5rem;
`;

export const CircleThree = styled.div`
  background: #28ca43;
  border-radius: 50%;
  height: 0.5rem;
  margin-right: 0.3rem;
  width: 0.5rem;
`;

export const CircleTwo = styled.div`
  background: #ffbe2f;
  border-radius: 50%;
  height: 0.5rem;
  margin-right: 0.3rem;
  width: 0.5rem;
`;

export const CircleWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 0.5rem;
`;

export const ContentWrapper = styled.div`
  padding: 5rem 3rem 5rem 5rem;
  width: 45%;

  ${mobile} {
    width: 100%;
  }
`;

export const CreateAccountButton = styled.a`
  background: #1da09c;
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

export const Image = styled.img`
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  height: auto;
  width: 100%;
`;

export const ImageNavBar = styled.div`
  background: #e8e8e8;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  height: 1.5rem;
  justify-content: space-between;
`;

export const ImageWrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: 6px 28px 77px -24px rgba(0, 0, 0, 1);
  height: fit-content;
  width: 75%;

  ${laptopS} {
    width: 55%;
  }

  ${mobile} {
    width: 85%;
  }

  ${mobileXXS} {
    width: 95%;
  }
`;

export const Logo = styled.p`
  color: white;
  display: flex;
  font-size: 2.6rem;
  letter-spacing: 0.2rem;
  user-select: none;
  white-space: nowrap;
`;

export const Row = styled.div`
  background: #b3b3b3;
  height: 0.2rem;
  margin-bottom: 0.125rem;
  width: 1rem;
  border-radius: 0.2rem;
`;

export const RowWrapper = styled.div`
  align-self: center;
  padding: 0 1rem;
`;

export const SplashBackground = styled.div`
  background-color: #37474f;
  height: 60rem;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: -10rem;
  transform: skewY(-15deg);
  width: 100%;
`;

export const SplashContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 0 2rem;
  position: absolute;
  top: 20rem;
  transform: skewY(15deg);
  width: 100%;

  ${laptopS} {
    top: 17.5rem;
  }

  ${mobile} {
    flex-direction: column-reverse;
    top: 15rem;
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
