import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BaseDropDownMenu } from 'components/base_ui';
import { defaultFontSize, hoverLinkColor, textColor } from 'defaultStyleHelper';

export const EmptyMessageContainer = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  height: 10rem;
  justify-content: center;
  width: 100%;
`;

export const ExternalTimelineActivity = styled.a`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const InternalTimelineActivity = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const StyledH3 = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 3rem 0;
`;

export const StyledAction = styled.span`
  font-weight: 700;
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin-left: 1rem;
  width: 15rem;
`;

export const StyledFundedIcon = styled.div`
  align-items: center;
  background-color: #c4efe0;
  border-radius: 50%;
  color: #31b589;
  display: flex;
  height: 2.4rem;
  place-content: center;
  position: absolute;
  width: 2.4rem;
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

export const TimelineType = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
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
