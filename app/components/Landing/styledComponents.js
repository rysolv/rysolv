import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { defaultFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { desktopL, laptopS, mobile } = mediaQueriesByDevice;

export const Card = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: ${textColor};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 auto 30px;
  max-width: 40rem;
  min-height: 36rem;
  padding: 30px 35px;
  text-align: center;

  ${laptopS} {
    min-height: 30rem;
  }
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

export const CardIcon = styled.div`
  svg {
    color: rgb(142, 142, 147);
    height: 4rem;
    width: 4rem;
  }
`;

export const CardItem = styled.li`
  display: flex;
  flex: 1;
  min-height: 0.1rem;
  padding: 0 1.5rem;
  width: 33.33333333%;

  ${laptopS} {
    width: 100%;
  }
`;

export const CardTitleWrapper = styled.div`
  color: #1e88e5;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-top: 17px;
`;

export const HorizontalList = styled.div`
  display: flex;
  width: 100%;

  ${laptopS} {
    margin-bottom: 2.5rem;
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

  ${desktopL} {
    margin-top: 55rem;
  }
`;

export const List = styled.li`
  align-items: center;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  max-width: 50%;
  padding: 0 1.5rem;
  text-align: center;
`;

export const ListContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  ${laptopS} {
    flex-direction: column;
  }
`;

export const ListContent = styled.div``;

export const ListImage = styled.div`
  margin: 0 2rem 2rem 2rem;

  svg {
    color: #1e88e5;
    height: 6rem;
    stroke-width: 0.05rem;
    stroke: white;
    width: 6rem;
  }
`;

export const ListText = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 2.4rem;
`;

export const ListTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem 0;
`;

export const Section = styled.div`
  margin-bottom: 10rem;

  ${mobile} {
    padding-top: 10rem;

    :nth-child(2) {
      padding-top: 0;
    }
  }
`;

export const StyledLink = styled(Link)`
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

export const StyledSubheader = styled.h2`
  color: #1da09c;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.5em;
  margin: 1rem 2rem 2rem 0;
  text-align: center;
`;

export const SubheaderWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

export const TextWrapper = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 2.4rem;
`;
