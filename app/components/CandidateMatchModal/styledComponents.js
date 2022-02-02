import styled from 'styled-components';

import { Circle } from 'components/base_ui';
import {
  blueColor,
  candidateGreyColor,
  grayColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

export const BaseBar = styled.div`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  margin: 0.6rem 0;
`;

export const MatchBar = styled.div`
  background: ${({ color }) => color}60;
  border-radius: 0.7rem;
  color: ${textColor};
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0.6rem 0;
  padding: 0.6rem;
  text-transform: capitalize;
  white-space: nowrap;
  width: ${({ percentage }) => percentage * 100}%;
`;

export const ModalContainer = styled.div`
  background: ${whiteColor};
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  left: 6rem;
  padding: 2rem;
  position: absolute;
  top: -4rem;
  width: 27.5rem;
  z-index: 10;
`;

export const ModalHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledCircle = styled(Circle)`
  height: 3.6rem;
  width: 3.6rem;

  svg {
    height: 3.6rem;
    width: 3.6rem;
  }
`;

export const StyledTitle = styled.h3`
  color: ${blueColor};
  font-size: 2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin: 0;
`;
