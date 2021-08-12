import styled from 'styled-components';

import { RewardWrapper, SecondaryButton } from 'components/base_ui';
import {
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  lightGreyColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const AcceptButton = styled(SecondaryButton)`
  align-self: center;
  margin: 0;
  min-width: 13.8rem;

  @media (max-width: 380px) {
    margin-top: 1rem;
    place-self: flex-end;
  }
`;

export const BountyContent = styled.div`
  display: flex;
  margin: 1rem 0;
  min-height: 7.5rem;
  width: 100%;

  ${mobile} {
    height: auto;
  }
`;

export const BountyContentInfo = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const BountyDetail = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;

  @media (max-width: 380px) {
    flex-direction: column;
  }
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
  width: 95%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const CreatedDate = styled.div`
  align-self: flex-end;
  font-size: ${detailFontSize};
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
  padding-right: 1.5rem;
`;

export const StyledExternalLink = styled.a`
  align-items: center;
  color: ${lightGreyColor};
  display: flex;
  font-size: ${defaultFontSize};
  font-weight: 500;
  margin-top: 1rem;
  white-space: nowrap;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }

  svg {
    height: 2rem;
    margin-right: 0.5rem;
    width: 2rem;
  }
`;

export const StyledRewardWrapper = styled(RewardWrapper)`
  @media (max-width: 380px) {
    margin-top: 1rem;
    place-self: flex-end;
  }
`;
