import styled from 'styled-components';

import { BaseDropDownMenu } from 'components/base_ui';
import { hoverLinkColor } from 'defaultStyleHelper';

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;
  width: 15rem;
`;

export const TimelineActivity = styled.span`
  color: #007bff;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const TimelineContainer = styled.div`
  height: 100%;
`;

export const TimelineContent = styled.div`
  font-size: 1.6rem;
  padding: 1rem;
`;

export const TimelineDividerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 10%;
`;

export const TimelineDollar = styled.span`
  font-weight: bolder;
  letter-spacing: 0.05rem;
`;

export const TimelineHorizontalDivider = styled.div`
  background: rgb(223, 223, 223);
  height: 1px;
  width: 100%;
`;

export const TimelineHeader = styled.ul`
  align-items: center;
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0;
`;

export const TimelineInfo = styled.div`
  line-height: 2rem;
`;

export const TimelineListItem = styled.div`
  display: flex;
`;

export const TimelineTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1rem 1rem 1rem 0;
  white-space: nowrap;
`;

export const TimelineType = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: bolder;
  letter-spacing: 0.05rem;
  line-height: 2rem;
`;

export const TimelineVerticalDivider = styled.div`
  align-content: center;
  background: rgb(223, 223, 223);
  height: 100%;
  position: relative;
  width: 1px;
`;
