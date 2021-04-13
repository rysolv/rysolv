import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  hoverGreen,
  hoverLinkColor,
  lightGreyColor,
  styledScrollbar,
  successGreen,
  textColor,
} from 'defaultStyleHelper';

export const AddIconWrapper = styled.div`
  place-self: center;

  svg {
    color: ${({ disabled }) => (disabled ? lightGreyColor : successGreen)};
    font-size: 3rem;

    &:hover {
      color: ${({ disabled }) => (disabled ? lightGreyColor : hoverGreen)};
      cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    }
  }
`;

export const IconWrapper = styled.div`
  margin: 0 0.5rem 0 0;
`;

export const ImportCardWrapper = styled.li`
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  margin: 0.5rem;
  padding: 0.25rem 0;
`;

export const PullNumberWrapper = styled.span`
  color: ${lightGreyColor};
`;

export const StyledBody = styled.div`
  width: 100%;
`;

export const StyledHeader = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  height: 2rem;
  padding: 0 1rem;
`;

export const StyledTitle = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  padding: 0 1rem;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const TextWrapper = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  margin: 2rem 0;
`;

export const UserPullRequestsContainer = styled.div`
  ${styledScrollbar}
  max-height: 22rem;
  overflow-y: auto;
  padding: 0 0 2rem 2rem;
`;
