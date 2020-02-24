import React from 'react';
import styled from 'styled-components';
import { BaseLink } from '../base_ui';

export const HeaderTab = styled(({ isActive, ...restProps }) => {
  const borderColor = isActive ? 'blue' : 'grey';
  return <div color={borderColor} width="100%" {...restProps} />;
})`
  border-bottom: ${({ isActive }) =>
    isActive ? '0.5rem solid blue' : '0.5rem solid grey'};
  display: flex;
  flex-direction: row;
  width: 15rem;
  &:hover {
    border-bottom: 0.5rem solid blue;
  }
  &.card {
    padding: 1rem;
  }
`;

export const HeaderTitle = styled(({ isActive, ...restProps }) => (
  <BaseLink {...restProps} />
))`
  color: ${({ isActive }) => (isActive ? 'blue' : 'grey')};
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 26px;
  margin: 0;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

export const AdminHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  width: 100%;
`;
