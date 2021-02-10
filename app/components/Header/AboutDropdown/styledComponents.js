import styled from 'styled-components';

import { DownArrow } from 'components/base_ui';
import { lightBlueColor, textColor } from 'defaultStyleHelper';

export const AboutButtonWrapper = styled.div`
  align-items: center;
  color: white;
  display: flex;
  height: 2rem;
  margin: 0 1rem 0 0.75rem;
  white-space: nowrap;

  &:hover {
    color: #b0bec5;
    cursor: pointer;
  }

  svg {
    font-size: 2rem;
  }
`;

export const AboutContainer = styled.div`
  position: relative;

  @media (max-width: 630px) {
    display: none;
  }
`;

export const MenuItem = styled.div`
  color: ${textColor};
  padding: 6px 8px 6px 16px;

  &:hover {
    background-color: ${lightBlueColor};
    color: #fff;
    cursor: pointer;
  }
`;

export const StyledAboutMenu = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #e1e4e8;
  box-shadow: 0 0.8rem 2.4rem rgba(149, 157, 165, 0.2);
  margin-top: 2.2rem;
  padding: 0.4rem 0;
  position: absolute;
  right: 9%;
  top: 100%;
  width: 16rem;
  z-index: 100;

  &:after,
  &:before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    left: 0;
    position: absolute;
    width: 0;
  }

  &:after {
    border-color: transparent transparent white transparent;
    border-width: 9px;
    left: 121px;
    top: -17px;
  }

  &:before {
    border-color: transparent transparent #e1e4e8 transparent;
    border-width: 9px;
    left: 121px;
    top: -19px;
  }
`;

export const StyledDownArrow = styled(DownArrow)`
  margin: -0.8rem;

  svg {
    height: 3rem;
    margin-left: 0.5rem;
    width: 3rem;
    margin-right: -0.5rem;
  }
`;
