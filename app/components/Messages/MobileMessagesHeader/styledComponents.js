import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { blueColor, textColor } from 'defaultStyleHelper';

export const HeaderWrapper = styled.div`
  align-items: center;
  color: ${blueColor};
  display: flex;
  font-size: 2rem;
  font-weight: 700;
  height: 4rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  top: 0;
  white-space: nowrap;
`;

export const LinkWraper = styled.div`
  align-items: center;
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 1.2rem;
  padding: 0;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${blueColor};
    height: 2rem;
    width: 2rem;
  }
`;

export const ThreadDescription = styled.span`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  height: 100%;
  line-height: 1.936rem;
  padding: 0.4rem 0 0 1.2rem;
`;
