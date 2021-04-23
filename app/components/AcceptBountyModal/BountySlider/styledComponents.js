import styled from 'styled-components';

import {
  defaultFontSize,
  fundingText,
  lightGreyColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileXS } = mediaQueriesByDevice;

export const Bounty = styled.div`
  color: ${fundingText};
  font-size: 2.8rem;
  font-weight: bold;
  max-width: 45%;
  padding: 1rem;
  text-align: center;

  ${mobileXS} {
    font-size: 2.2rem;
  }
`;

export const BountySliderContainer = styled.div`
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
  background-color: #d4d7dc;
  border-radius: 0.6rem;
  height: 1.2rem;
  opacity: 1;
  outline: none;
  transition: opacity 0.2s;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: white;
    border-radius: 50%;
    border: 0.3rem solid ${textColor};
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
  }

  &::-moz-range-thumb {
    background: white;
    border-radius: 50%;
    border: 0.3rem solid ${textColor};
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
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
  margin-top: 1rem;
`;
