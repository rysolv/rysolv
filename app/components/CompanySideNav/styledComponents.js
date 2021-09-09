import styled from 'styled-components';

import { blueColor, grayColor, whiteColor } from 'defaultStyleHelper';

export const ButtonTextWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
`;

export const CompanySideNavContainer = styled.div`
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  height: 46.3rem;

  @media (max-width: 769px) {
    height: auto;
  }
`;

export const CompanySideNavHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem;
`;

export const LocationText = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding-top: 0.5rem;
  text-transform: capitalize;
`;

export const PositionButton = styled.button`
  background-color: ${({ isSelected }) =>
    isSelected ? blueColor : whiteColor};
  border: none;
  color: ${({ isSelected }) => (isSelected ? whiteColor : blueColor)};
  display: flex;
  font-family: monospace;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.025rem;
  line-height: 1.936rem;
  padding: 2rem 1rem 2rem 2rem;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${blueColor};
    color: ${whiteColor};
    cursor: pointer;
  }

  svg {
    font-size: 1.6rem;
    margin-right: 0.8rem;
  }
`;
