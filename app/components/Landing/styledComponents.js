import styled from 'styled-components';

import { defaultFontSize } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptopS, mobile } = mediaQueriesByDevice;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  margin: 0 auto 30px;
  max-width: 500px;
  min-height: 36rem;
  padding: 30px 35px;
  text-align: center;
`;

export const CardContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  ${laptopS} {
    align-items: center;
    flex-direction: column;
  }
`;

export const CardItem = styled.li`
  min-height: 0.1rem;
  padding: 0 1.5rem;
  width: 33.33333333%;

  ${laptopS} {
    width: 100%;
  }
`;

export const Icon = styled.div`
  background: linear-gradient(to bottom right, #4db6ac 0%, #00796b 100%);
  color: #34a297;
  position: relative;
  margin: 0 20px;
  width: 56px;
  height: 87px;
  border-radius: 10px;
  display: inline-block;
  top: 0;
  transition: all 0.2s ease;

  &:before {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: inherit;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(60deg);
  }

  &:after {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: inherit;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(-60deg);
  }
`;

export const IconCircle = styled.div`
  align-items: center;
  background: #fff;
  border-radius: 50%;
  bottom: 0;
  display: flex;
  height: 5rem;
  justify-content: center;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 5rem;
  z-index: 10;

  svg {
    width: 4rem;
    height: 4rem;
  }
`;

export const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
  transform: scale(0.7);
  user-select: none;
`;

export const LandingWrapper = styled.div`
  font-size: ${defaultFontSize};
  margin-top: 52.5rem;
`;

export const StyledSubheader = styled.h2`
  color: #1da09c;
  font-size: 2.2rem;
  font-weight: 500;
  line-height: 1.5em;
  margin: 1rem 2rem 2rem 0;
  text-align: center;
`;

export const SubheaderWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;

  ${mobile} {
    padding-top: 5rem;
  }
`;
