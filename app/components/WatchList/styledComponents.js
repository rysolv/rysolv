import styled from 'styled-components';

import { defaultFontSize, hoverLinkColor, textColor } from 'defaultStyleHelper';

export const EmptyWatchListMessage = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  height: 100%;
  margin: 2rem 0;
  width: 100%;
`;

export const EmptyWatchListItem = styled.div`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const IconWrapper = styled.div`
  float: right;
`;

export const StyledTitle = styled.h1`
  color: ${textColor};
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
  min-width: 40rem;
  padding: 1rem 0;
  text-align: center;
`;

export const Username = styled.a`
  font-size: ${defaultFontSize};
  font-weight: 500;
  padding-left: 2rem;

  &:hover {
    color: ${hoverLinkColor};
  }
`;

export const WatchList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1rem;
  width: 100%;
`;

export const WatchListContainer = styled.div`
  padding: 1rem;
`;

export const WatchListDetail = styled.div`
  align-items: center;
  color: #007bff;
  display: flex;
  flex: 100%;
  height: 100%;
  margin: 0.5rem 0 0.5rem 1rem;
`;

export const WatchListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;
