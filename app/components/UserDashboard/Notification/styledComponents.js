import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { PrimaryButton } from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  grayColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 0;
  text-transform: initial;
  width: fit-content;
`;

export const NotificationContainer = styled.div`
  background: ${blueColor};
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  color: ${whiteColor};
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding: 3.2rem 4.1rem;
  position: relative;
  width: 100%;
`;

export const NotificationDescription = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  margin: 0.8rem 0;
`;

export const NotificationTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.45rem;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0;
  position: absolute;
  right: 1.6rem;
  top: 1.6rem;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${whiteColor};
    height: 1.6rem;
    width: 1.6rem;
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${whiteColor};
  border: 0.2rem solid ${darkBlueColor};
  color: ${darkBlueColor};
  place-self: end;

  &:hover {
    background-color: ${whiteColor};
    color: ${darkBlueColor};
  }
`;
