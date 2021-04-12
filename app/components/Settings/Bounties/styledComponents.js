import styled from 'styled-components';
import { SecondaryButton } from 'components/base_ui';

import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const AcceptButton = styled(SecondaryButton)`
  align-self: center;
  display: inline-block;
  margin: 0;
  width: auto;
`;

export const BountyContent = styled.div`
  display: flex;
  margin: 1rem 0;
  width: 100%;

  ${mobile} {
    height: auto;
  }
`;

export const BountyContentInfo = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  flex: 100%;
`;

export const BountyDetail = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export const BountyList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
`;

export const BountyListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const CreatedDate = styled.div`
  align-self: flex-end;
  font-size: ${detailFontSize};
  margin-bottom: 1rem;
`;

export const IssueName = styled.a`
  font-size: ${defaultFontSize};

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const IssueNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 1.5rem;
`;

export const LinkWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0 0.5rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledExternalLink = styled.a`
  font-size: ${detailFontSize};
  padding-left: 0.5rem;
  white-space: nowrap;

  &:hover {
    color: ${hoverLinkColor};
  }
`;
