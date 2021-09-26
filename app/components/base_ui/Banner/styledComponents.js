import styled from 'styled-components';

import { FlatIconButton } from 'components/base_ui/Buttons';
import { textColor, whiteColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  align-items: center;
  background-color: ${whiteColor};
  border-left: 0.5rem solid ${({ color }) => color};
  border-radius: 0.4rem;
  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.2);
  color: ${textColor};
  display: ${({ displayState }) => (displayState ? 'flex' : 'none')};
  font-size: 1.6rem;
  height: ${({ displayState }) => (displayState ? 'auto' : '0')};
  margin-bottom: ${({ bottomMarginRequired }) => bottomMarginRequired || '0'};
  margin-top: ${({ topMarginRequired }) => topMarginRequired || '0'};
  overflow: hidden;
  padding: ${({ displayState }) => (displayState ? '0.5rem' : '0')};
  transition: all 0.25s;
`;

export const CloseButton = styled(FlatIconButton)`
  background-color: transparent;
  color: #ddd;
  margin-left: auto;
  min-width: 3rem;
  padding: 0.6rem 1.6rem;
`;

export const IconWrapper = styled.div`
  color: ${({ color }) => color};
  margin-left: 0.5rem;

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const MessageWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SingleText = styled.div`
  font-size: 1.6rem;
  margin: 0rem 1rem;
`;

export const StyledListItem = styled.li`
  list-style: none;
`;
