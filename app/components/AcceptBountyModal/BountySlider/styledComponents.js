import styled from 'styled-components';

import {
  defaultFontSize,
  headerColor,
  lightGreyColor,
  textColor,
} from 'defaultStyleHelper';

export const Bounty = styled.div`
  color: green;
  font-size: 2.8rem;
  font-weight: bold;
  padding: 1rem 2rem;
  text-align: center;
`;

export const BountySlideContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Percentage = styled.div`
  color: ${lightGreyColor};
  font-size: ${defaultFontSize};
  margin-top: 0.5rem;
`;

export const SlideContainer = styled.div`
  align-items: center;
  display: flex;
  height: 8rem;
  width: 100%;
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  -webkit-transition: 0.2s;
  appearance: none;
  background: #d3d3d3;
  height: 1.5rem;
  opacity: 0.8;
  outline: none;
  transition: opacity 0.2s;
  width: 100%;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: ${headerColor};
    border-radius: 0.25rem;
    cursor: pointer;
    height: 3rem;
    width: 1.5rem;
  }
  &::-moz-range-thumb {
    background: ${headerColor};
    border-radius: 0.25rem;
    cursor: pointer;
    height: 3rem;
    width: 1.5rem;
  }
`;

export const Title = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

export const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;
